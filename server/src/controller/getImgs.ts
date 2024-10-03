import type { Request, Response } from 'express'
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import AWS, { S3 } from 'aws-sdk'

// See if making this into a singleton could give perf boost.
// instantiate one s3client obj and use that amonst all my functions
const awsS3 = new AWS.S3();

// Maybe figure out how to pass an s3 obj here and instantiate the s3 up in index.ts
async function getImgs(req: Request, res: Response) {
    console.log("retrieving imgs....")
    
    // Place this in a new func and put that in services layer later
    const aws_params = {
        Bucket: process.env.AWS_BUCKET,
    };

    try {

        // Place this in a new func and put that in services layer later
        const data: S3.ListObjectsV2Output = await awsS3.listObjectsV2(aws_params).promise();
        
        const imageObjects = data.Contents?.filter(object => 
            object.Key?.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|webp)$/)
        ) || [];

        // Maybe remove the expires? Potential make the objects public
        const imageUrls = imageObjects.map(object => ({
            key: object.Key,
            url: awsS3.getSignedUrl('getObject', {
                Bucket: process.env.AWS_BUCKET,
                Key: object.Key,
                Expires: 60 * 5 // URL expires in 5 minutes
                // url: `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${object.Key}`
            })
        }));

        res.status(200).json({ images: imageUrls });
    } catch (err) {
        console.error('Error listing objects:', err);
        res.status(500).json({ error: 'Error retrieving image list' });
    }
}

export { getImgs }