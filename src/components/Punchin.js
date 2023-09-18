import React, { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

const FaceScanner = () => {
  const webcamRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        // Load the SsdMobilenetv1 model for face detection
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
        
        // Load other required models for face landmarks and recognition
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        
        console.log('Models loaded successfully.');
        
        // Now that the models are loaded, set up the camera
        setupCamera();
      } catch (error) {
        console.error('Error loading models:', error);
      }
    };

    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    loadModels();
  }, []);

  const captureImageAndRecognize = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      // Perform facial recognition logic here using face-api.js
      // For example:
      const inputImage = new Image();
      inputImage.src = imageSrc;
      const detections = await faceapi.detectAllFaces(inputImage).withFaceLandmarks().withFaceDescriptors();

      // Determine if a face is detected and take action accordingly
      if (detections.length > 0) {
        console.log('Face detected.');
      } else {
        console.log('No face detected.');
      }
    } else {
      console.error('Camera not available.');
    }
  };

  return (
    <div>
      <h1>Face Scanner</h1>
      <input type="file" accept="image/*" capture="camera"/>

      <Webcam
        audio={false}
        ref={webcamRef}
      />
     
    </div>
  );
};

export default FaceScanner;
