import type { Request, Response } from 'express'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import AWS from 'aws-sdk';

async function getImgs(req: Request, res: Response) {
    const s3 = new AWS.S3();

    // Look this up later
    const params = {
        Bucket: 'bucket-here',
        Key: 'key-here get from req obj from front-end'
    }

    try {
        const imgData = await s3.getObject(params).promise()
        if (imgData.ContentType) 
            res.setHeader('Content-Type', imgData.ContentType)
        
        res.status(200).json({ imgData: imgData.Body })
        res.send(imgData.Body)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error retrieving images. '})
    }

}
