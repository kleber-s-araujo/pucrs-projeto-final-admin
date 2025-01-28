import React, { useState } from 'react';
import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: 'your-project-id',
  keyFilename: 'path-to-your-service-account.json',
});

const UploadFileComponent: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const bucketName = 'your-bucket-name';
      const blob = storage.bucket(bucketName).file(selectedFile.name);
      const blobStream = blob.createWriteStream();

      blobStream.on('finish', () => {
        console.log(`File ${selectedFile.name} uploaded successfully.`);
      });

      blobStream.on('error', (err) => {
        console.error('Upload error:', err);
      });

      blobStream.end(selectedFile);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadFileComponent;
