import type { Request, Response } from 'express'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({ region: 'Add region here' })

async function uploadImg(req: Request, res: Response) {
    console.log("uploading img....")
    if (!req.body || !req.body.img) {
        return res.status(400).json({ error: 'No img provided'})
    }

    try {

        // Place this logic in a new func in the services
        // Do I rly need to base64 encode it?
        const base64Data = req.body.img.replace(/^data:image\/\w+;base64,/, '')
        const buffer = Buffer.from(base64Data, 'base64');

        // Fix ContentType to accept multiple diff types of files
        const aws_params = {
            Bucket: process.env.AWS_BUCKET,
            Key: process.env.AWS_ACCESS_KEY_ID,
            Body: buffer,
            ContentType: `iamge/jpeg`
        }

        await s3Client.send(new PutObjectCommand(aws_params))

        res.status(200).json({ message: 'Image uploaded successfully' })
    } catch (error) {
        console.error('Error uploading image: ', error)
        res.status(500).json({ error: 'Failed to upload image' })
    }
}

export { uploadImg }