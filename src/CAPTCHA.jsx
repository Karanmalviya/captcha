import React, {useState, useEffect, useRef} from "react";

const ImageCaptcha = () => {
  const canvasRef = useRef(null);
  const [captchaText, setCaptchaText] = useState("");
  const [inputText, setInputText] = useState("");
  const [isValid, setIsValid] = useState(false);

  const generateCaptchaImage = () => {
    setInputText("");
    setIsValid(false);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    const characters =
      "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
    const captcha = Array.from({length: 6}, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
    setCaptchaText(captcha);

    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 300; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      context.fillStyle = "rgba(0, 0, 0, 0.15)";
      context.fillRect(x, y, 2, 2);
    }

    context.font = "bold 36px Arial";
    context.fillStyle = "black";
    for (let i = 0; i < captcha.length; i++) {
      const x = 20 + i * 30 + Math.random() * 15 - 7.5;
      const y = 40 + Math.random() * 25 - 12.5;
      const angle = (Math.random() - 0.5) * 0.6;
      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.fillText(captcha.charAt(i), 0, 0);
      context.restore();
    }
  };

  useEffect(() => {
    generateCaptchaImage();
  }, []);

  const refreshCaptcha = () => {
    generateCaptchaImage();
    setInputText("");
    setIsValid(false);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    setIsValid(event.target.value === captchaText);
  };

  return (
    <div>
      <div>
        <canvas ref={canvasRef} width={200} height={50} />
      </div>
      <button onClick={refreshCaptcha}>Refresh</button>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      {inputText !== "" &&
        (isValid ? (
          <span style={{color: "green"}}>Captcha Matched</span>
        ) : (
          <span style={{color: "red"}}>Captcha Not Matched</span>
        ))}
    </div>
  );
};

export default ImageCaptcha;
