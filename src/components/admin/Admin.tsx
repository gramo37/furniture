import { auth } from "@/app/constants";
import { getBase64Images } from "@/utils";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

type Section = {
  category: string;
  images: Array<string>;
};

const AdminPage = ({
  setIsLoggedIn,
  data,
}: {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  data: any;
}) => {
  const [sections, setSections] = useState<Section[]>(data.portfolio);
  const [loading, setLoading] = useState<boolean>(false);

  const addSection = useCallback(async () => {
    setLoading(true);
    setTimeout(() => {
      setSections((prevSections) => [
        ...prevSections,
        { category: "", images: [] },
      ]);
      setLoading(false);
    }, 500); // Simulate a delay to test loading state
  }, []);

  const deleteSection = useCallback(async (index: number) => {
    setLoading(true);
    setTimeout(() => {
      setSections((prevSections) => prevSections.filter((_, i) => i !== index));
      setLoading(false);
    }, 500); // Simulate a delay to test loading state
  }, []);

  const handleFileChange = async (index: number, files: FileList | null) => {
    if (files && files.length > 0) {
      try {
        const base64Images = await getBase64Images(files);
        if (!base64Images) return;
        const updatedSections = [...sections];
        updatedSections[index].images = [
          ...updatedSections[index].images,
          ...base64Images,
        ];
        setSections(updatedSections);
      } catch (error) {
        console.error("Error converting file to base64:", error);
      }
    }
  };

  const handleCategoryBlur = (index: number, value: string) => {
    const updatedSections = [...sections];
    updatedSections[index].category = value;
    setSections(updatedSections);
  };

  const logout = () => {
    sessionStorage.setItem(auth, "");
    setIsLoggedIn(false);
  }

  const save = async () => {
    const response = await fetch('/admin/api/uploadSection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: sections }),
    });

    if (response.ok) {
      alert('Section added!');
    }
  }

  return (
    <>
      {loading && (
        <div className="h-screen w-screen absolute top-0 left-0 bg-[#c7c7c7d9] z-50 flex justify-center items-center">
          <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
        </div>
      )}
      <button onClick={save}>Save</button>
      <button onClick={logout}>Logout</button>
      <div className="min-h-[90vh] m-2 p-2">
        {sections.map((section, index) => (
          <div key={index} className="p-4 border mb-2">
            <input
              type="text"
              placeholder="New Category"
              defaultValue={section.category}
              onBlur={(e) => handleCategoryBlur(index, e.target.value)}
              disabled={loading}
              className="border px-2 py-1 w-full mb-2"
            />
            <input
              type="file"
              multiple
              onChange={(e) => handleFileChange(index, e.target.files)}
              disabled={loading}
              className="border px-2 py-1 w-full mb-2"
            />
            <button
              onClick={() => deleteSection(index)}
              disabled={loading}
              className={`text-white px-4 py-2 rounded ${
                loading ? "bg-red-100" : "bg-red-500"
              }`}
            >
              Delete
            </button>
            <div className="mt-2">
              <strong>Uploaded Images:</strong>
              <ul>
                {section.images.map((image, imgIndex) => (
                  <li key={imgIndex}>
                    <img
                      src={image}
                      alt={`Preview ${imgIndex}`}
                      className="w-16 h-16 object-cover inline-block mr-2"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <button
          onClick={addSection}
          disabled={loading}
          className={` text-white px-4 py-2 rounded ${
            loading ? "bg-blue-100" : "bg-blue-500"
          }`}
        >
          Add Section
        </button>
        {/* <pre className="mt-4 p-2 bg-gray-100 border">{JSON.stringify(sections, null, 2)}</pre> */}
      </div>
    </>
  );
};

export default AdminPage;
