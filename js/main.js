(function() {
  const canvas = document.getElementById('main-canvas');
  const context = canvas.getContext('2d');
  let nodes = [];
  let nodeCount;
  let NODES_DENSITY = 0.5;
  const NODES_RADIUS = 10;
  const NODES_TO_HIGHLIGHT = 5;
  let cursorX = 0, cursorY = 0;

  // resize the canvas to fill browser window dynamically
  window.addEventListener('resize', resizeCanvas, false);
  window.addEventListener('mousemove', onMouseMove, false);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    nodeCount = Math.round(canvas.offsetWidth * canvas.offsetHeight * NODES_DENSITY / 10000);
    generateNodes();
    window.requestAnimationFrame(drawStuff);
  }

  function onMouseMove(event) {
    cursorX = event.clientX;
    cursorY = event.clientY;
    window.requestAnimationFrame(drawStuff);
  }

  function generateNodes() {
    nodes = [];
    for(let i=0; i<nodeCount; i++) {
      nodes.push({
        x: Math.random(),
        y: Math.random(),
        distanceFromCursor: 9999
      })
    }
  }

  function refreshDistanceFromCursor() {
    nodes.forEach(node => {
      node.distanceFromCursor = Math.sqrt(Math.pow(cursorX - node.x * canvas.offsetWidth, 2) + Math.pow(cursorY - node.y * canvas.offsetHeight, 2))
    });
    nodes = nodes.sort((a, b) => a.distanceFromCursor-b.distanceFromCursor)
  }

  generateNodes();

  resizeCanvas();

  function drawStuff() {

    refreshDistanceFromCursor();

    context.fillStyle = "#d1e3e3";
    context.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    nodes.forEach((node, index) => {
      const currentX = node.x * ((canvas.offsetWidth - NODES_RADIUS*2) + NODES_RADIUS);
      const currentY = node.y * ((canvas.offsetHeight - NODES_RADIUS*2) + NODES_RADIUS);
      if (index < NODES_TO_HIGHLIGHT) {
        context.beginPath();
        context.moveTo(cursorX, cursorY);
        context.lineTo(currentX, currentY);
        context.stroke();
        drawANode(currentX, currentY, NODES_RADIUS, true)
      }
      else {
        drawANode(currentX, currentY, NODES_RADIUS, false)
      }
    });

  }

  function drawANode(x, y, radius, fill) {
    context.beginPath();
    context.fillStyle = "#c55316";
    context.strokeStyle = "#381606";
    context.arc(x, y, radius, 0, 2 * Math.PI);
    if (fill) context.fill();
    context.stroke();
  }
})();
