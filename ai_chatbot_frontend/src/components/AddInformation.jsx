import React from "react";
import NavigationBar from "./NavigationBar";

export default function AddInformation() {
  const [title, setTitle] = React.useState("");
  const [date, setDate] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [sections, setSections] = React.useState([]);

  const addSection = () => {
    setSections([...sections, { title: "", content: "" }]);
  };

  const updateSection = (index, key, value) => {
    const newSections = [...sections];
    newSections[index][key] = value;
    setSections(newSections);
  };

  const deleteSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
    <NavigationBar />  
      
      <div style={{ display: "flex", flexGrow: 1 }}>
        <div style={{ width: "50%", padding: "24px", backgroundColor: "white", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "16px" }}>Add Information</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <input
              placeholder="Enter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ padding: "8px", border: "1px solid #d1d5db", borderRadius: "4px" }}
            />
            <input
              placeholder="Enter date(s)..."
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ padding: "8px", border: "1px solid #d1d5db", borderRadius: "4px" }}
            />
            <textarea
              placeholder="Enter a general description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ padding: "8px", border: "1px solid #d1d5db", borderRadius: "4px" }}
            />
          </div>
          <div style={{ marginTop: "16px" }}>
            {sections.map((section, index) => (
              <div key={index} style={{ marginBottom: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <input
                  placeholder="Enter section title..."
                  value={section.title}
                  onChange={(e) => updateSection(index, "title", e.target.value)}
                  style={{ padding: "8px", border: "1px solid #d1d5db", borderRadius: "4px" }}
                />
                <textarea
                  placeholder="Enter section content..."
                  value={section.content}
                  onChange={(e) => updateSection(index, "content", e.target.value)}
                  style={{ padding: "8px", border: "1px solid #d1d5db", borderRadius: "4px" }}
                />
                <button onClick={() => deleteSection(index)} style={{ backgroundColor: "#6b7280", color: "white", padding: "8px", borderRadius: "4px" }}>Delete Section</button>
              </div>
            ))}
            <button onClick={addSection} style={{ marginRight: "8px", backgroundColor: "#dc2626", color: "white", padding: "8px 16px", borderRadius: "4px" }}>Add Section</button>
            <button style={{ backgroundColor: "#b91c1c", color: "white", padding: "8px 16px", borderRadius: "4px" }}>Submit</button>
          </div>
        </div>
        <div style={{ width: "50%", padding: "24px" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: "bold" }}>Preview</h2>
          <div style={{ marginTop: "16px", padding: "16px", border: "1px solid #d1d5db", borderRadius: "8px" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{title || "Title"}</h3>
            <p style={{ color: "#6b7280" }}>{date || "Date(s)"}</p>
            <p style={{ marginTop: "8px" }}>{description || "Description"}</p>
            {sections.map((section, index) => (
              <div key={index} style={{ marginTop: "16px" }}>
                <h4 style={{ fontSize: "1.125rem", fontWeight: "bold" }}>{section.title || "Section Title"}</h4>
                <p>{section.content || "Section Content"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
