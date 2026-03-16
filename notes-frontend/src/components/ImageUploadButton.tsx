import React, { useRef, useState } from 'react';
import { Image as ImageIcon, Loader2 } from 'lucide-react';
import { useTheme } from './ThemeProvider';



interface ImageUploadButtonProps {
  onUploadComplete: (url: string) => void;
}




export default function ImageUploadButton({ onUploadComplete }: ImageUploadButtonProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // A reference to the hidden HTML file input
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

   //Formdata
    const formData = new FormData();
    formData.append('file', file);




    try {
      // 2. Send it to your new backend route!
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // 3. Pass the Cloudinary URL back to your editor
        onUploadComplete(data.url); 
      } else {
        alert("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error('Error uploading:', error);
    } finally {
      setIsUploading(false);
      // Reset the input so they can upload another file later
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };







  return (
    <div>
      {/* The actual file input is hidden from the user */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      




      {/* The beautiful button they actually click */}
      {/* <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
          isDark 
            ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
            : 'hover:bg-black/5 text-gray-500 hover:text-black'
        } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        title="Upload Image"
      >
        {isUploading ? (
          <Loader2 size={18} className="animate-spin text-yellow-500" />
        ) : (
          <ImageIcon size={18} />
        )}
      </button> */}


        <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className={`relative p-2.5 rounded-xl flex items-center justify-center
        transition-all duration-200 active:scale-95
        border backdrop-blur-md shadow-sm
        ${isDark
        ? 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20 hover:text-white shadow-black/20'
        : 'bg-white/60 border-white/80 text-gray-500 hover:bg-white/80 hover:text-gray-800 shadow-black/10'
        }
        ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
    title="Upload Image"
>
  {/* Inner gloss highlight */}
  <span className={`absolute inset-0 rounded-xl pointer-events-none
    ${isDark
      ? 'bg-gradient-to-b from-white/15 to-transparent'
      : 'bg-gradient-to-b from-white/90 to-transparent'
    }`}
  />

  {isUploading ? (
    <Loader2 size={18} className="animate-spin text-yellow-400 relative z-10" />
  ) : (
    <ImageIcon size={18} className="relative z-10" />
  )}
</button>



    </div>
  );
}