import type { Request, Response } from 'express'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({ region: 'Add region here' })

async function uploadImg(req: Request, res: Response) {
    console.log("uploading img....")
    if (!req.body || !req.body.img) {
        return res.status(400).json({ error: 'No img provided'})
    }

    try {
        // Do I rly need to base64 encode it?
        const base64Data = req.body.img.replace(/^data:image\/\w+;base64,/, '')
        const buffer = Buffer.from(base64Data, 'base64');

        // Fix ContentType to accept multiple diff types of files
        const params = {
            Bucket: 'name-of-bucket',
            Key: `images/${Date.now()}.jpg`,
            Body: buffer,
            ContentType: `iamge/jpeg`
        }

        await s3Client.send(new PutObjectCommand(params))

        res.status(200).json({ message: 'Image uploaded successfully' })
    } catch (error) {
        console.error('Error uploading image: ', error)
        res.status(500).json({ error: 'Failed to upload image' })
    }
}

export { uploadImg }