'use client';

import { useEffect, useState, useMemo } from 'react';
import * as XLSX from 'xlsx';

export default function Home() {
  const [resources, setResources] = useState<any[]>([]);
  const [org, setOrg] = useState<any>(null);
  const [previewData, setPreviewData] = useState<any[][] | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');

  useEffect(() => {
    fetch('/api/resources')
      .then((res) => res.json())
      .then((data) => setResources(data.resources))
      .catch((err) => console.error('Failed to fetch resources:', err));

    fetch('/api/organization')
      .then((res) => res.json())
      .then((org) => setOrg(org))
      .catch((err) => console.error('Failed to fetch organization info:', err));
  }, []);

  const handlePreview = async (url: string) => {
    console.log("Preview clicked for:", url);
    setLoadingPreview(true);
    try {
      const encodedUrl = encodeURIComponent(url);
      const res = await fetch(`/api/proxy?url=${encodedUrl}`);
      const blob = await res.blob();
      const arrayBuffer = await blob.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
      setPreviewData(jsonData);
    } catch (error) {
      console.error('Failed to load file:', error);
    } finally {
      setLoadingPreview(false);
    }
  };

  const filteredResources = useMemo(() => {
    return resources.filter((file) => {
      const nameMatch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
      const formatMatch =
        selectedFormat === '' || file.format.toLowerCase() === selectedFormat.toLowerCase();
      return nameMatch && formatMatch;
    });
  }, [resources, searchTerm, selectedFormat]);

  return (
    <main className="min-h-screen bg-[#1b2e4b] font-sans p-6">
      
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-[#1a73e8] mb-8">
          📊 Commercial Data Dashboard
        </h1>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-48 px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none"
          />
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="w-48 px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none"
          >
            <option value="">All Formats</option>
            <option value="CSV">CSV</option>
            <option value="XLSX">XLSX</option>
            <option value="JSON">JSON</option>
          </select>
        </div>

        <div className="flex flex-col gap-5">
          {filteredResources.map((file, index) => (
            <div
              key={index}
              className={`flex gap-4 items-start p-5 border-l-8 rounded-lg shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer ${file.format === 'XML' ? 'bg-gray-200 opacity-70 cursor-not-allowed' : 'bg-[#e3f2fd]'}`}
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#0c57c1] mb-1">{file.name}</h3>
                <p className="text-sm text-gray-700 mb-1">
                  Format: <span className="uppercase">{file.format}</span>
                </p>
                <p className="text-sm text-gray-500">Created: {file.createdAt}</p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <a
                  href={file.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Download
                </a>
                {(file.format === 'CSV' || file.format === 'XLSX') && (
                  <button
                    onClick={() => handlePreview(file.downloadUrl)}
                    className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Preview
                  </button>
                )}
                {file.format === 'XML' && (
                  <span className="text-red-500 text-xs">Unavailable</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
