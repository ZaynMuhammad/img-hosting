import type { Request, Response } from 'express'
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import AWS from 'aws-sdk'

async function getImgs(req: Request, res: Response) {
    const s3 = new AWS.S3();
    
    const params = {
        Bucket: process.env.AWS_BUCKET,
        // Optionally, you can add a Prefix to filter objects
        // Prefix: 'images/'
    };


    // Come back here one
    try {
        const data = await s3.listObjectsV2(params).promise();
        const imageObjects = data.Contents?.filter(object => 
            object.Key?.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|webp)$/)
        ) || [];

        const imageUrls = imageObjects.map(object => ({
            key: object.Key,
            url: s3.getSignedUrl('getObject', {
                Bucket: process.env.AWS_BUCKET,
                Key: object.Key,
                Expires: 60 * 5 // URL expires in 5 minutes
            })
        }));

        res.status(200).json({ images: imageUrls });
    } catch (err) {
        console.error('Error listing objects:', err);
        res.status(500).json({ error: 'Error retrieving image list' });
    }
}
