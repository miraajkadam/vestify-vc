import React, { useState, useCallback } from "react";
import { X, Upload } from "lucide-react";
import Papa from "papaparse";
interface FileUploadModalProps {
  isOpen: boolean;
  isPending: boolean;
  onClose: () => void;
  handleUpload: () => void;
  setExcelData: (data: any[]) => void;
  groupName: string;
  excelData: any[];
  isGroupNameAdded: boolean;
  handleTextInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FileUploadModal({
  isOpen,
  onClose,
  groupName,
  handleTextInput,
  isGroupNameAdded,
  isPending,
  handleUpload,
  excelData,
  setExcelData,
}: FileUploadModalProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleCancel = () => {
    onClose();
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    Papa.parse(file, {
      header: true,
      complete: function (results) {
        setExcelData(results.data);
      },
    });
  };

  // const handleDistribute = async () => {
  //   if (!groupName) {
  //     setIsGroupNameAdded(true);
  //   } else {
  //     const payload = {
  //       name: groupName,
  //       addresses: excelData
  //         .splice(0, excelData.length - 1)
  //         .map((item) => item.walletAddress),
  //       projectId: projectId,
  //       fee: 433,
  //       maxAllocation: 40,
  //       minAllocation: 30,
  //     };
  //     try {
  //       await mutateAsync(payload);
  //       toast.success("Uploaded success fully");
  //       onClose();
  //     } catch (err) {
  //       onClose();
  //       toast.error("API got failed ");
  //     }
  //   }
  // };

  // const handleUpload = useCallback(() => {
  //   if (selectedFile) {
  //     onUpload(selectedFile);
  //     setSelectedFile(null);
  //     onClose();
  //   }
  // }, [selectedFile, onUpload, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-50  max-w-lg w-full bg-white rounded-lg shadow-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Upload Excel File
          </h2>
          <button
            onClick={handleCancel}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="mt-4 mb-1">
          <label
            htmlFor="GroupName"
            className="block text-sm font-medium text-black mb-1"
          >
            Group Name
          </label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={handleTextInput}
            placeholder="Enter group name"
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        {isGroupNameAdded && (
          <div className="mt-1">
            <p className="text-red-500 text-base">Please Enter Group Name</p>
          </div>
        )}

        {excelData.length > 0 ? (
          <>
            <h3 className="text-black text-lg">
              {excelData?.length} Wallet Addresses
            </h3>
            <div className="flex bg-indigo-100 flex-col max-h-[150px] overflow-auto  items-start gap-2">
              {excelData?.map((item) => (
                <div
                  key={item?.walletAddress}
                  className="flex flex-col items-start gap-2 px-2"
                >
                  <p className="text-black text-base">{item?.walletAddress}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
            border-2 border-dashed rounded-lg p-8
            flex flex-col items-center justify-center
            transition-colors
            ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
           
          `}
          >
            <>
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-600 text-center mb-2">
                Drag and drop your Excel file here or
              </p>
              <label className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer transition-colors">
                Browse Files
                <input
                  type="file"
                  className="hidden"
                  accept=".csv"
                  onChange={handleFileInput}
                />
              </label>
              <p className="text-sm text-gray-500 mt-2">
                Supported formats: .csv
              </p>
            </>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={excelData.length === 0 && !groupName}
            className={`
              px-4 py-2 rounded-md transition-colors
              ${
                excelData.length > 0 && groupName
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            {isPending ? "Uploading..." : "Add Pool"}
            {/* Distribute */}
          </button>
        </div>
      </div>
    </div>
  );
}
