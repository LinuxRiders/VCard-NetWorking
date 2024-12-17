import React, { useState, useRef, useEffect } from "react";
import "../../css/VCard.css";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTransgender,
  FaBriefcase,
  FaWhatsapp,
  FaDownload,
  FaGlobe,
} from "react-icons/fa";
import { jsPDF } from "jspdf";
import { useParams } from "react-router-dom";
import { getDataUser } from "../../api/api";

const VCard = () => {
  const { id } = useParams();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (id == null) return;

    const getData = async () => {
      try {
        const response = await getDataUser({ id });

        if (response.ok) {
          const json = await response.json();

          setUserData(json?.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [id]);

  const [fileType, setFileType] = useState("pdf"); // Estado para el tipo de archivo
  const [menuVisible, setMenuVisible] = useState(false); // Estado para la visibilidad del menú
  const menuRef = useRef(null);

  const handleDownload = () => {
    setMenuVisible(!menuVisible);
  };

  const handleFileTypeSelection = (type) => {
    setFileType(type);
    setMenuVisible(false);
    switch (type) {
      case "pdf":
        handleDownloadPdf();
        break;
      case "json":
        handleDownloadJson();
        break;
      case "txt":
        handleDownloadTxt();
        break;
      default:
        console.log("Tipo de archivo no soportado");
    }
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDownloadPdf = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    // Configurar dimensiones
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Agregar fondo de color
    doc.setFillColor("#263a42"); // Color de fondo
    doc.rect(0, 0, pageWidth, pageHeight, "F"); // Dibujar rectángulo de fondo

    // Agregar la foto
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = userData.foto;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const imgData = canvas.toDataURL("image/jpeg");

      // Dibujar la imagen en la página
      doc.addImage(imgData, "JPEG", 40, 40, 100, 100); // Ajusta las posiciones y tamaños según necesites

      // Agregar el nombre en color naranja
      doc.setTextColor("#f4a261"); // Color naranja
      doc.setFontSize(28);
      doc.setFont("helvetica", "bold");
      doc.text(`${userData.nombres} ${userData.apellidos}`, 160, 80); // Posición x, y

      // Agregar una línea separadora
      doc.setDrawColor("#f4a261"); // Color naranja para la línea
      doc.setLineWidth(1);
      doc.line(40, 170, pageWidth - 40, 170); // Línea horizontal

      // Agregar información detallada
      doc.setFontSize(14);
      const info = [
        { label: "Cargo", value: userData.cargo },

        { label: "Procedencia", value: userData.procedencia },
        { label: "Teléfono", value: userData.telefono },
        { label: "Correo", value: userData.correo },
      ];

      let currentY = 190;
      info.forEach((item) => {
        // Establecer color para el título (naranja)
        doc.setTextColor("#f4a261");
        doc.setFont("helvetica", "bold");
        doc.text(`${item.label}:`, 40, currentY);

        // Establecer color para el valor (blanco) y dividir el texto si es necesario
        doc.setTextColor("#ffffff");
        doc.setFont("helvetica", "normal");

        // Definir el ancho máximo para el texto
        const maxWidth = pageWidth - 150; // Ajusta según tus necesidades

        // Dividir el texto en líneas que se ajusten al ancho máximo
        const textLines = doc.splitTextToSize(`${item.value}`, maxWidth);

        // Añadir cada línea de texto
        textLines.forEach((line, index) => {
          doc.text(line, 150, currentY);
          currentY += 20; // Ajusta el espaciado entre líneas si es necesario
        });

        currentY += 10; // Espaciado adicional entre diferentes campos
      });

      // Opcional: Agregar un borde o footer
      // doc.setDrawColor("#f4a261");
      // doc.rect(20, pageHeight - 40, pageWidth - 40, 20); // Rectángulo en la parte inferior

      doc.save("perfil.pdf");
    };

    // Manejar errores al cargar la imagen
    img.onerror = () => {
      console.error("Error al cargar la imagen para el PDF.");
      // Opcional: Proceder sin la imagen o mostrar un mensaje de error en el PDF
      doc.setTextColor("#ffffff");
      doc.setFontSize(16);
      doc.text("No se pudo cargar la imagen del usuario.", 40, 80);

      // Agregar el nombre en color naranja
      doc.setTextColor("#f4a261"); // Color naranja
      doc.setFontSize(28);
      doc.setFont("helvetica", "bold");
      doc.text(`${userData.nombres} ${userData.apellidos}`, 160, 80); // Posición x, y

      // Agregar una línea separadora
      doc.setDrawColor("#f4a261"); // Color naranja para la línea
      doc.setLineWidth(1);
      doc.line(40, 170, pageWidth - 40, 170); // Línea horizontal

      // Agregar información detallada
      doc.setFontSize(14);
      const info = [
        { label: "Cargo", value: userData.cargo },
        // { label: "Género", value: userData.genero },
        { label: "Procedencia", value: userData.procedencia },
        { label: "Teléfono", value: userData.telefono },
        { label: "Correo", value: userData.correo },
      ];

      let currentY = 190;
      info.forEach((item) => {
        // Establecer color para el título (naranja)
        doc.setTextColor("#f4a261");
        doc.setFont("helvetica", "bold");
        doc.text(`${item.label}:`, 40, currentY);

        // Establecer color para el valor (blanco) y dividir el texto si es necesario
        doc.setTextColor("#ffffff");
        doc.setFont("helvetica", "normal");

        // Definir el ancho máximo para el texto
        const maxWidth = pageWidth - 150; // Ajusta según tus necesidades

        // Dividir el texto en líneas que se ajusten al ancho máximo
        const textLines = doc.splitTextToSize(`${item.value}`, maxWidth);

        // Añadir cada línea de texto
        textLines.forEach((line, index) => {
          doc.text(line, 150, currentY);
          currentY += 20; // Ajusta el espaciado entre líneas si es necesario
        });

        currentY += 10; // Espaciado adicional entre diferentes campos
      });

      doc.save("perfil.pdf");
    };
  };

  const handleDownloadTxt = () => {
    const dataStr = `
      Nombre: ${userData.nombres} ${userData.apellidos}
      Cargo: ${userData.cargo}
      Procedencia: ${userData.procedencia}
      Teléfono: ${userData.telefono}
      Correo: ${userData.correo}
    `;
    const blob = new Blob([dataStr], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "perfil.txt";
    link.click();

    URL.revokeObjectURL(url);
  };

  const message = `¡Hola ${userData.nombres}!`;

  // Función para manejar el click
  const handleClick = () => {
    // Remueve el signo "+" del número si está presente
    const phoneNumber = userData.telefono.replace("+", "");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover", // Asegura que el video cubra toda el área sin distorsión
          zIndex: -1, // Envía el video al fondo
          filter: "blur(5px)",
        }}
      >
        <source
          src="https://rutaausangate.com/wp-content/uploads/2024/01/ruta-ausangate-ccaijo.mp4"
          type="video/mp4"
        />
        Tu navegador no soporta videos.
      </video>

      {/* Contenedor del card */}
      <div className="container">
        {/* Sección de descarga */}
        <div className="downloadSection" ref={menuRef}>
          <FaDownload
            className="actionIcon"
            onClick={handleDownload}
            title="Descargar"
          />
          {/* Menú Desplegable */}
          {menuVisible && (
            <div className="menu">
              <div
                className="menuItem"
                onClick={() => handleFileTypeSelection("pdf")}
              >
                PDF
              </div>
              <div
                className="menuItem"
                onClick={() => handleFileTypeSelection("txt")}
              >
                TXT
              </div>
            </div>
          )}
        </div>

        {/* Foto de usuario */}
        <img src={userData.foto} alt="Foto del usuario" className="photo" />

        {/* Información del usuario */}
        <div className="info">
          <FaUser className="icon" />
          <span>
            {userData.nombres} {userData.apellidos}
          </span>
        </div>
        <div className="info">
          <FaBriefcase className="icon" />
          <span>{userData.cargo}</span>
        </div>
        <div className="info">
          <FaMapMarkerAlt className="icon" />
          <span>{userData.procedencia}</span>
        </div>
        <div className="info">
          <FaPhone className="icon" />
          <span>{userData.telefono}</span>
        </div>
        <div className="info">
          <FaEnvelope className="icon" />
          <a href={`mailto:${userData.correo}`} className="link">
            {userData.correo}
          </a>
        </div>

        {/* Botones de acciones */}
        <div className="buttons" style={{ justifyContent: "space-evenly" }}>
          <div
            className="buttonContainer"
            style={{ cursor: "pointer" }}
            onClick={handleClick}
          >
            <FaWhatsapp
              className="actionIcon"
              style={{ transition: "transform 0.3s ease" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
            <div className="actionText">Contactar</div>
          </div>

          {userData?.comunity && (
            <div
              className="buttonContainer"
              style={{ cursor: "pointer" }}
              onClick={() => window.open(userData.comunity, "_blank")}
            >
              <FaGlobe
                className="actionIcon"
                style={{ transition: "transform 0.3s ease" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
              <div className="actionTextMultiline">
                Visita mi <br /> comunidad
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VCard;
