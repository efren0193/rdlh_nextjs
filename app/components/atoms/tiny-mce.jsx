import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function TinyMCE({ value, label, name, onChange }) {

  return (
    <div className='mb-4'>
      <label className="block mb-2 font-bold text-gray-700">{label}</label>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_MCE}
        value={value}
        init={{
          menubar: false,
          plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        }}
        onEditorChange={(content) => onChange(content)}
      />
    </div>
  );
}