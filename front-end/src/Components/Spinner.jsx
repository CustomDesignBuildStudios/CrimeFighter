function Spinner() {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width="200"
        height="200"
        style={{
          shapeRendering: "auto",
          display: "block",
          background: "rgba(255, 255, 255, 0)",
        }}
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g>
          <g transform="translate(77,50)">
            <g transform="rotate(0)">
              <circle cx="0" cy="0" r="6" fill="#fb8c29" fillOpacity="1">
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  begin="-0.875s"
                  values="1.26 1.26;1 1"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                ></animateTransform>
                <animate
                  attributeName="fill-opacity"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                  values="1;0"
                  begin="-0.875s"
                ></animate>
              </circle>
            </g>
          </g>
          <g transform="translate(69.09188309203678,69.09188309203678)">
            <g transform="rotate(45)">
              <circle cx="0" cy="0" r="6" fill="#fb8c29" fillOpacity="0.875">
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  begin="-0.75s"
                  values="1.26 1.26;1 1"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                ></animateTransform>
                <animate
                  attributeName="fill-opacity"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                  values="1;0"
                  begin="-0.75s"
                ></animate>
              </circle>
            </g>
          </g>
          <g transform="translate(50,77)">
            <g transform="rotate(90)">
              <circle cx="0" cy="0" r="6" fill="#fb8c29" fillOpacity="0.75">
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  begin="-0.625s"
                  values="1.26 1.26;1 1"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                ></animateTransform>
                <animate
                  attributeName="fill-opacity"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                  values="1;0"
                  begin="-0.625s"
                ></animate>
              </circle>
            </g>
          </g>
          <g transform="translate(30.90811690796322,69.09188309203678)">
            <g transform="rotate(135)">
              <circle cx="0" cy="0" r="6" fill="#fb8c29" fillOpacity="0.625">
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  begin="-0.5s"
                  values="1.26 1.26;1 1"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                ></animateTransform>
                <animate
                  attributeName="fill-opacity"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                  values="1;0"
                  begin="-0.5s"
                ></animate>
              </circle>
            </g>
          </g>
          <g transform="translate(23,50)">
            <g transform="rotate(180)">
              <circle cx="0" cy="0" r="6" fill="#fb8c29" fillOpacity="0.5">
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  begin="-0.375s"
                  values="1.26 1.26;1 1"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                ></animateTransform>
                <animate
                  attributeName="fill-opacity"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                  values="1;0"
                  begin="-0.375s"
                ></animate>
              </circle>
            </g>
          </g>
          <g transform="translate(30.908116907963212,30.90811690796322)">
            <g transform="rotate(225)">
              <circle cx="0" cy="0" r="6" fill="#fb8c29" fillOpacity="0.375">
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  begin="-0.25s"
                  values="1.26 1.26;1 1"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                ></animateTransform>
                <animate
                  attributeName="fill-opacity"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                  values="1;0"
                  begin="-0.25s"
                ></animate>
              </circle>
            </g>
          </g>
          <g transform="translate(49.99999999999999,23)">
            <g transform="rotate(270)">
              <circle cx="0" cy="0" r="6" fill="#fb8c29" fillOpacity="0.25">
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  begin="-0.125s"
                  values="1.26 1.26;1 1"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                ></animateTransform>
                <animate
                  attributeName="fill-opacity"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                  values="1;0"
                  begin="-0.125s"
                ></animate>
              </circle>
            </g>
          </g>
          <g transform="translate(69.09188309203678,30.908116907963212)">
            <g transform="rotate(315)">
              <circle cx="0" cy="0" r="6" fill="#fb8c29" fillOpacity="0.125">
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  begin="0s"
                  values="1.26 1.26;1 1"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                ></animateTransform>
                <animate
                  attributeName="fill-opacity"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                  values="1;0"
                  begin="0s"
                ></animate>
              </circle>
            </g>
          </g>
          <g></g>
        </g>
      </svg>
    </div>
  );
}

export default Spinner;
