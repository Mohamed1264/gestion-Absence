import { useState } from "react"
import { UploadCloud, } from "lucide-react"
import Select from "../LittleComponents/Select"
import { ToastContainer } from "react-toastify"
import { style } from "../Users"
import ErrorMsg from "../LittleComponents/FormComponents/ErrorMsg"

import ConfirmAdding from "../LittleComponents/Modals/ConfirmAdding"
import { notify } from "../Functions/Toast"
import SubmitButton from "../LittleComponents/FormComponents/SubmitButton"
import Container from "../LittleComponents/FormComponents/Container"
import FieldContainer from "../LittleComponents/FormComponents/FieldContainer"

export default function ImportStudents({ groups }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmited, setIsSubmited] = useState(false);

  const handleChange = (name, value) => {
    if (!value.trim()) {
      const newFormData = formData;
      delete newFormData[name];
      setFormData(newFormData);
      return false;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "file") {
      InFocus(name);
    }
  };
  const InFocus = (name) => {
    const updetedErros = { ...errors };
    delete updetedErros[name];
    setErrors(updetedErros);
  };

  

  const handleError = () => {
    const failures = {};

    return failures;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = handleError();

    if (Object.keys(validation).length) {
      setErrors(validation);
      return false;
    }
    setIsSubmited(true);
  };

  const handleClick = () => {
    notify("students imported  seccussfully" );
    setIsSubmited(false);
    setFormData({});
  };

  const config = {
    type: "group",
    error: errors.group,
    onDelete: InFocus,
    onChange: handleChange,
    defaultValue: formData.group,
    placeholder: "select group",
  };

  return (
    <>
      <ToastContainer pauseOnHover={false} closeButton={false} />
      <form className="max-w-sm mx-auto " onSubmit={handleSubmit}>
        <Container title="Upload File">
          <FieldContainer title={"Students File"}>
            <div
              className={`rounded-r-md px-3 border py-2  outline-none flex-1  ${
                style.input
              } ${errors.file ? style.errorBorder : style.border}  `}
            >
              <label
                htmlFor="dropzone-file"
                className="flex items-center justify-center gap-2 "
              >
                {formData.file ? (
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-50">
                    {formData.file}
                  </p>
                ) : (
                  <>
                    <UploadCloud size={20} className="text-gray-500" />
                    <p className=" text-sm font-medium text-gray-500">
                      Uplod XLS, XLSX{" "}
                    </p>
                  </>
                )}

                <input
                  id="dropzone-file"
                  type="file"
                  name="file"
                  className="hidden"
                  accept=".xls,.xlsx"
                  onChange={({ target }) =>
                    handleChange("file", target.files[0].name)
                  }
                />
              </label>
            </div>
          </FieldContainer>

          <ErrorMsg value={errors.file} />
          <FieldContainer title={"Group"}>
            <Select
              items={groups}
              config={{ ...config, defaultValue: formData.group || "" }}
            />
          </FieldContainer>
        </Container>

        {/* submit Button */}
        <SubmitButton
          disabled={Object.keys(formData).length < 2}
          title={"Import Student"}
        />
      </form>

      {/* confirm adding modal */}
      {isSubmited && (
        <ConfirmAdding
          data={formData}
          setIsSubmited={setIsSubmited}
          handleClick={handleClick}
        />
      )}
    </>
  );
}