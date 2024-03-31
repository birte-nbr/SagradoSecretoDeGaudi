// define model (low and high detail)
/*
let models = [
	{ name: "very detailed (14MB)", filename: "models/sagrada-familia.glb", poster: "models/cathedral.webp" },
	{ name: "less detailed (2MB)", filename: "models/sagrada-familia.glb", poster: "models/cathedral.webp" }
]
*/
let models = [
	{ name: "very detailed (14MB)", filename: "models/sagrada-final.glb", poster: "models/cathedral.webp" },
	{ name: "less detailed (2MB)", filename: "models/sagrada-final.glb", poster: "models/cathedral.webp" }
]



// call all functions 
resizeModel();
zoomModel();
setAutoRotateModel();
initModelSelector();
//initVariantSelector();  leave out for now 
//switchModelExample();
zoomModel();
setRotateSpeedOfModel();
setOrbitSensitivityForModel();



// all functions are written here, most are for setting the model up (zoom, annotations, size, etc.)
function initModelSelector() {
	const parentElement = document.getElementById("model-chooser")
	models.map(function (model) {
		const template = document.getElementById("model-select").content;
		const input = template.querySelector("input")
		input.id = model.name;
		input.value = model.name;

		const label = template.querySelector("label")
		label.setAttribute("for", model.name);
		label.innerText = model.name;

		return template.cloneNode(true);
	}).forEach(function (element) {
		parentElement.appendChild(element)
	});
}
/*
const defaultVariantChooserContent = document.getElementById("variant-chooser").innerHTML

function initVariantSelector() {
	const parentElement = document.getElementById("variant-chooser")
	parentElement.innerHTML = defaultVariantChooserContent;
	//	console.log(document.querySelector("#model-auto-mit-artefakten-texturiert"))
	const viewer = document.querySelector("#Basílica-de-la-Sagrada-Familía")
	viewer.availableVariants.map(function (variant) {
		const template = document.getElementById("variant-select").content;
		const input = template.querySelector("input")
		input.id = variant
		input.value = variant;

		const label = template.querySelector("label")
		label.setAttribute("for", variant);
		label.innerText = variant;

		const currentVariant = viewer.variantName === null ? viewer.availableVariants[0] : viewer.variantName
		if (currentVariant === variant) {
			input.checked = true;
		}
		else {
			input.checked = false;
		}

		return template.cloneNode(true);
	}).forEach(function (element) {
		parentElement.appendChild(element)
	});
}*/
function resizeModel() {
	var new_height = document.getElementById("model-size").value;
	var new_width = new_height * 1.5;
	document.getElementById("Basílica-de-la-Sagrada-Familía").style.width = new_width + "px";
	document.getElementById("Basílica-de-la-Sagrada-Familía").style.height = new_height + "px";
}

async function zoomModel() {
	var slider = document.getElementById("model-zoom");
	var zoom = parseInt(slider.getAttribute("max")) - slider.value + parseInt(slider.getAttribute("min"));

	console.log("zoom to " + zoom + "%");

	var old_camera_orbit = document.getElementById("Basílica-de-la-Sagrada-Familía").getAttribute("camera-orbit");
	var old_camera_orbit_array = old_camera_orbit.split(" ");
	var new_camera_orbit = old_camera_orbit_array[0] + " " + old_camera_orbit_array[1] + " " + zoom + "%";
	document.getElementById("Basílica-de-la-Sagrada-Familía").setAttribute("camera-orbit", new_camera_orbit);

	await reloadModel();
}

async function setAutoRotateModel() {
	if (document.querySelector('#auto-rotate').checked) {
		console.log("auto-rotate on");
		document.getElementById("Basílica-de-la-Sagrada-Familía").setAttribute("auto-rotate", "on");
	} else {
		console.log("auto-rotate off");
		document.getElementById("Basílica-de-la-Sagrada-Familía").removeAttribute("auto-rotate");
	}

	await reloadModel();
}

async function setRotateSpeedOfModel() {
	var new_rotate_speed = document.getElementById("model-rotate-speed").value;
	console.log("set rotate speed to " + new_rotate_speed + "%");
	document.getElementById("Basílica-de-la-Sagrada-Familía").setAttribute("rotation-per-second", new_rotate_speed + "%");

	await reloadModel();
}

/*
async function switchModelExample() {
	for (const model of models) {
		if (document.querySelector('input[name="switch-model"]:checked').value == model.name) {
			console.log("switch model to " + model.name);
			const viewer = document.querySelector('#Basílica-de-la-Sagrada-Familía');
			//viewer.poster = model.poster;
			document.querySelector("#lazy-load-poster").style.backgroundImage = "url(" + model.poster + ")";
			viewer.querySelector("#button-load").innerText = "Load 3D model: " + model.name;
			//viewer.showPoster();
			viewer.setAttribute("src", model.filename);

		}
	}

	await reloadModel();
	initVariantSelector();
}

async function switchVariantExample() {
	for (const variant of document.querySelector("#Basílica-de-la-Sagrada-Familía").availableVariants) {
		if (document.querySelector('input[name="switch-variant"]:checked').value == variant) {
			console.log("switch variant to " + variant);
			document.querySelector('#Basílica-de-la-Sagrada-Familía').variantName = variant
		}
	}

	await reloadModel();
} */

async function setOrbitSensitivityForModel() {
	let new_orbit_sensitivity = document.getElementById("model-orbit-sensitivity").value;
	console.log("set orbit sensitivity to " + new_orbit_sensitivity);
	document.getElementById("Basílica-de-la-Sagrada-Familía").setAttribute("orbit-sensitivity", new_orbit_sensitivity);
	await reloadModel();
}

function setShowAnnotations() {
	let display_state;
	if (document.getElementById("show-annotations").checked) {
		display_state = "block";
	} else {
		display_state = "none";
	}
	console.log("setting annotation display to " + display_state);
	document.querySelectorAll(".HotspotAnnotation").forEach(function (x) {
		x.style.display = display_state;
	});
}

async function reloadModel() {
	let model_element = document.getElementById("model-container");
	await model_element.updateComplete;
	setShowAnnotations();
}


// add functionality to annotations

const modelViewer = document.querySelector("#Basílica-de-la-Sagrada-Familía");

// camera target moves when annotation is clicked 
function handleAnnotationClick(annotation) {
	const dataset = annotation.dataset;
	modelViewer.cameraOrbit = dataset.orbit;
	modelViewer.cameraTarget = dataset.target;
	modelViewer.fieldOfView = dataset.zoom || '25deg'; // Use the specified zoom level, or default to 25 degrees
	
}


// retrieves the id from clicked dot

function getCloseID(button){
	console.log(button);
	let id = button.getAttribute("id");
	closeTextBox(id);
}


// open and closing logic for textboxes 

// open
function showTextBox(id) {
	const currentTextbox = document.getElementById("textbox-" + id);
    const textboxArea = document.querySelector(".textbox-area");

    // Check if the clicked textbox is already open
    const isOpen = currentTextbox.style.display === 'block';

    // Close all textboxes
    document.querySelectorAll('.textbox').forEach(textbox => {
        textbox.style.display = 'none';
    });

    // Hide textbox area if no textbox is open
    textboxArea.style.display = 'none';

    // Hide skip buttons if no textbox is open
    document.getElementById('last').style.visibility = 'hidden';
    document.getElementById('next').style.visibility = 'hidden';

    if (!isOpen) {
        // Open the clicked textbox
        currentTextbox.style.display = 'block';
        textboxArea.style.display = 'block';
        document.getElementById('last').style.visibility = 'visible';
        document.getElementById('next').style.visibility = 'visible';
    }
}

// close 
function closeTextBox(id) {
    const textbox = document.getElementById("textbox-" + id);
    textbox.style.display = 'none';
    document.getElementById('next').style.visibility = 'hidden';
    document.getElementById('last').style.visibility = 'hidden';
}


// skip between text boxes 
// forward

function skipForward(arrow) {
	const currentTextbox = document.querySelector('.textbox[style="display: block;"]'); // check for textbox on display
    const previousTextbox = currentTextbox.nextElementSibling;
    
    if (previousTextbox && previousTextbox.classList.contains('textbox')) {
        currentTextbox.style.display = 'none';
        previousTextbox.style.display = 'block';
    } else {
		currentTextbox.style.display = 'none';
		document.getElementById("textbox-1").style.display = 'block'; // begin at 1 
	}

}

// same functionality for the left arrow

function skipBackward() {
	const currentTextbox = document.querySelector('.textbox[style="display: block;"]');
    const previousTextbox = currentTextbox.previousElementSibling;
    
    if (previousTextbox && previousTextbox.classList.contains('textbox')) {
        currentTextbox.style.display = 'none';
        previousTextbox.style.display = 'block';
    } else {
		currentTextbox.style.display = 'none';
		document.getElementById("textbox-7").style.display = 'block'; // go back to 7
	}

}


// scrolling text disappears - does not work
let textbox = document.querySelectorAll(".textbox").forEach((textbox) => {
	textbox.addEventListener('scroll', function() {
		let content = document.querySelector(".textbox-content");
		const lineHeight = parseInt(window.getComputedStyle(content).lineHeight);
		const bufferHeight = lineHeight * 2;  // last two lines 
		if (content.offsetHeight > textbox.offsetHeight) {
			console.log("text was scrolled", content.offsetHeight, textbox.scrollTop, textbox.offsetHeight, bufferHeight);
			const isScrollable = (content.offsetHeight - textbox.scrollTop) > (textbox.offsetHeight + bufferHeight);
			content.classList.toggle('hidden-text', isScrollable);
		}
	});
}); 


// color model - does not work
// there is never any color defined in the original model viewer set up
const modelViewerColor = document.querySelector("model-viewer#color");

document.querySelectorAll('#color-controls button').forEach((button) => {
	button.addEventListener('click', (event) => {
		const colorString = event.target.dataset.color;
		const modelViewer = document.querySelector("#Basílica-de-la-Sagrada-Familía");
		const [material] = modelViewer.model.materials;
		material.pbrMetallicRoughness.setBaseColorFactor(colorString);
	});
});

function handleColorHotspotClick(event) {
	const colorString = event.target.dataset.color;
	const meshId = event.target.dataset.meshId; // Add data-mesh-id attribute to your color buttons
	
        // Find the specific mesh material and update its color
        // const material = modelViewer.querySelector(`[mesh-id="${meshId}"]`).material;
        // material.pbrMetallicRoughness.setBaseColorFactor("70CBFF");
    

    // Attach click event listeners to color buttons
    // document.querySelectorAll('.controls button').forEach((button) => {
    //     button.addEventListener('click', handleColorHotspotClick);
    // });
}
// event handlers for annotations

document.querySelectorAll(".Hotspot").forEach(hotspot => {
    hotspot.addEventListener('click', () => {
        hotspot.classList.toggle('-visited');
        const id = hotspot.getAttribute("slot").split('-')[1];
        showTextBox(id);
    });
});

document.querySelectorAll(".nav-point").forEach(point => {
    point.addEventListener('click', () => {
        point.classList.toggle('-visited');
        const id = point.getAttribute("id").split('-')[1];
        showTextBox(id);
    });
});

// event handler for textboxes  
document.querySelectorAll('.close').forEach((button) => {
	button.addEventListener('click', () => getCloseID(button));
});

// event handler for color - does not work

document.querySelectorAll('.Hotspot').forEach((hotspot) => {
	hotspot.addEventListener('click', () => handleAnnotationClick(hotspot));
	hotspot.addEventListener('click', (event) => {
		const colorString = event.target.dataset.color;
		const modelViewer = document.querySelector("model-viewer");
		
		
		console.log(modelViewer.model.materials[0].pbrMetallicRoughness);
		 
		for (let x = 0; x < 7; x++){
			if (x === parseInt(event.target.dataset.material)) {
				//Update the color
				const material = modelViewer.model.materials[event.target.dataset.material];
		
				material.pbrMetallicRoughness.setBaseColorFactor("#70CBFF");
			} else {
				modelViewer.model.materials[x].pbrMetallicRoughness.setBaseColorFactor("#947c5f");
				//console.log(x);
			}
		};
	});
});



// dismiss poster once model is loaded 

document.querySelector('#button-load').addEventListener('click',
	function () {
		document.querySelector('#Basílica-de-la-Sagrada-Familía').dismissPoster();
	});

// currently not in use	
/*
document.querySelector("#Basílica-de-la-Sagrada-Familía").addEventListener("load", function () {
	initVariantSelector();
});
*/

