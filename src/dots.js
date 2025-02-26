export class ConnectedDots extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 300 300");

    const connections = this.generateConnections();
    this.renderConnections(svg, connections);
    this.renderDots(svg);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(svg);
  }

  getDotPosition(index) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return {
      x: 100 * col + 50,
      y: 100 * row + 50,
    };
  }

  generateConnections() {
    const connections = [];
    for (let i = 0; i < 9; i++) {
      for (let j = i + 1; j < 9; j++) {
        if (Math.random() < 0.4) {
          connections.push([i, j]);
        }
      }
    }
    return connections;
  }

  renderDots(svg) {
    for (let index = 0; index < 9; index++) {
      const { x, y } = this.getDotPosition(index);
      const dot = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      dot.setAttribute("cx", x);
      dot.setAttribute("cy", y);
      dot.setAttribute("r", "10");
      dot.setAttribute("fill", "white");
      dot.setAttribute("stroke", "currentColor");
      dot.setAttribute("stroke-width", "2");
      svg.appendChild(dot);
    }
  }

  renderConnections(svg, connections) {
    connections.forEach(([start, end]) => {
      const startPos = this.getDotPosition(start);
      const endPos = this.getDotPosition(end);

      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", startPos.x);
      line.setAttribute("y1", startPos.y);
      line.setAttribute("x2", endPos.x);
      line.setAttribute("y2", endPos.y);
      line.setAttribute("stroke", "currentColor");
      line.setAttribute("stroke-width", "1");
      line.setAttribute("stroke-opacity", "0.3");
      svg.appendChild(line);
    });
  }
}

