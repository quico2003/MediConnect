import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { FormLabel } from "react-bootstrap";

const Editor = ({
  title,
  value = "",
  onChange,
  id,
  maxHeight,
  placeholder,
}) => {
  const resizeHeight = (editor) => {
    editor.editing.view.change((writer) => {
      writer.setStyle(
        "height",
        `${maxHeight}px`,
        editor.editing.view.document.getRoot()
      );
    });
  };

  return (
    <div className="w-100 mb-2">
      {title && (
        <FormLabel className="mb-0" htmlFor={id}>
          {title}
        </FormLabel>
      )}
      <CKEditor
        placeholder={placeholder}
        id={id}
        editor={ClassicEditor}
        data={value}
        onReady={resizeHeight}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange({
            target: {
              value: data,
              id,
            },
          });
        }}
      />
    </div>
  );
};

export default Editor;
