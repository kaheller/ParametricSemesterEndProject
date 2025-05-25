function setup() {
  createCanvas(800, 800, WEBGL);
}

let asciifier; // Define the `asciifier` variable to store the `P5Asciifier` instance
let img;

function preload() {
    img = loadImage('house.png');
}

function setup() {
    setAttributes('antialias', false);
    createCanvas(windowWidth, windowHeight, WEBGL);
}

// After `p5.asciify` is set up in the background after `setup()`,
// we can call `setupAsciify()` to configure `p5asciify` and it's `P5Asciifier` instances and rendering pipelines
function setupAsciify() {
    // Fetch the default `P5Asciifier` instance provided by the library
    asciifier = p5asciify.asciifier();

    // Disable all pre-defined renderers in the rendering pipeline of the `asciifier` instance
    asciifier.renderers().disable();

    // Update the pre-defined `accurate` renderer with the provided options
    asciifier.renderers().get("accurate").update({
        enabled: true,
        // Use all characters in the asciifier's font
        characters: asciifier.fontManager.characters.toString(),
        characterColorMode: "sampled",
        backgroundColorMode: "sampled",
    });
}

// Draw the image on the canvas to be asciified
function draw() {
    clear();
    image(img, -windowWidth / 2, -windowHeight / 2);
}

// After the asciified content is drawn to the canvas, use `drawAsciify()` to draw on top of it
function drawAsciify() {
    const fpsText = "FPS:" + Math.min(Math.ceil(frameRate()), 60);

    noStroke();
    fill(0);
    rect(-width / 2, height / 2 - textAscent() - 4, textWidth(fpsText), textAscent());

    textFont(asciifier.fontManager.font);
    textSize(64);
    fill(255, 255, 0);
    text(fpsText, -width / 2, height / 2);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
