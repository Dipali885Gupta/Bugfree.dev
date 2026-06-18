"use client";

import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';

export default function QRGenerator() {
  const websiteUrl = "https://www.getcodefree.tech/";
  const [size, setSize] = useState(300);

  const downloadQR = () => {
    const svg = document.getElementById('qr-code');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = size;
    canvas.height = size;

    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'getcodefree-qr-code';
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 flex items-center justify-center p-8">
      <div className="bg-white/10 backdrop-blur-lg border border-green-500/30 rounded-2xl p-8 max-w-2xl w-full shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            QR Code Generator
          </h1>
          <p className="text-green-400 text-lg">
            getcodefree.tech
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 flex justify-center mb-6">
          <QRCodeSVG
            id="qr-code"
            value={websiteUrl}
            size={size}
            level="H"
            includeMargin={true}
            fgColor="#000000"
            bgColor="#ffffff"
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-white mb-2 font-medium">
              QR Code Size: {size}px
            </label>
            <input
              type="range"
              min="200"
              max="500"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full h-2 bg-green-500/30 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
          </div>

          <button
            onClick={downloadQR}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Download QR Code
          </button>

          <div className="text-center text-white/70 text-sm mt-4">
            <p>Scan this QR code to visit:</p>
            <p className="text-green-400 font-mono">{websiteUrl}</p>
          </div>
        </div>

        <div className="mt-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <h3 className="text-white font-semibold mb-2">💡 Tips for printing:</h3>
          <ul className="text-white/80 text-sm space-y-1">
            <li>• Use at least 300px size for business cards</li>
            <li>• Test the QR code before printing</li>
            <li>• Ensure high contrast (dark on light background)</li>
            <li>• Leave some white space around the QR code</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
