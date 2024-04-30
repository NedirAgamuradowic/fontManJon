const replaceArray = ['&lt;i class="', 'fa-solid', 'fa-brands', 'fa-', '"&gt;&lt;/i&gt;' ];
const solid = 'solid';
const codes = document.querySelectorAll('.iconbox .code');
const iconBoxElement = document.querySelectorAll('.iconbox');
const searchInput = document.querySelector('#search');
const iconModal = document.querySelector('#iconmodal');

codes.forEach(item => {
	let element = item.innerHTML;
	if (element.includes(solid)) {
		item.classList.add('solid');
	} else {
		item.classList.add('brands');
	}
	for (let i = 0; i < replaceArray.length; i++) {
		element = element.replace(replaceArray[i], '');
	}
	element = element.replace( /\s/g, '').toString();
	item.classList.add(element);
});

// show all iconbox elements
	for (let i = 0; i < iconBoxElement.length; i++) {
		iconBoxElement[i].classList.add('show');
}

// add active class for first filter element
document.querySelectorAll('.filter__btn')[0].classList.add('active');


// badge effect function
function badgeEffect(target) {
	target.classList.add('badge');
	window.getSelection().removeAllRanges();
	setTimeout(()=>{
		target.classList.remove('badge');
	}, 1000);
}

// iconbox value
function iconBoxChild(target) {
	const icon = target.children[0].innerHTML;
	iconModal.querySelector('.icon').innerHTML = icon;
	const name = target.children[1].innerHTML;
	iconModal.querySelector('.name').innerHTML = name;
	const codetype ='fa-' + target.children[2].getAttribute('class').split(' ')[1];
	const codename =' fa-' + target.children[2].getAttribute('class').split(' ')[2];
	const code = codetype + codename;
	iconModal.querySelector('.code-name').innerHTML = code;
}

// copy clipboard
function copyClipboard(value) {
	const textarea = document.createElement('textarea');
	textarea.value = value;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	document.body.removeChild(textarea);
}

// add evenet listener
window.addEventListener('click', generalFunction);
function generalFunction(e) {
	const target = e.target;
	checkDataAttribute(target);
}

// condition for data attribute answer
function checkDataAttribute(target) {
	return answer = (target.hasAttribute('data-findElement')) ? conditionDataElement(target) : conditionForElement(target);
}

// if target doesnt has data attribute
function conditionForElement(target) {
	// if target  button
	if (target.classList.contains('btn')) {
		const value = target.previousElementSibling.textContent;
		copyClipboard(value);
		badgeEffect(target);
	}

	// if target iconbox
	if(target.classList.contains('iconbox') ){
		iconModal.classList.add('show');
		iconBoxChild(target);
	}

	// if target code box
	if(target.classList.contains('code-box')){
		const value = target.textContent
		copyClipboard(value);
		badgeEffect(target);
	}
}

// if target has data attribute
function conditionDataElement(target) {
	const answer = target.classList.contains('filter__btn'); 

	// if target has filter__btn class
	if (answer) {
		//add active class target element
		document.querySelector('.active').classList.remove('active');
		target.classList.add('active');

		// remove show class from icon boxs
		for (let i = 0; i < iconBoxElement.length; i++) {
			iconBoxElement[i].classList.remove('show');
		}

		// get target inner text
		const filter = target.innerHTML.replace( /\s/g, '').toLowerCase().toString();

		// find filterable elements 
		const filterElements = icongrid.getElementsByClassName(filter);

		// check array length
		if(filterElements.length > 0){

			// add filterable iconbox show class
			for (let i = 0; i < filterElements.length; i++) {
				const parent = filterElements[i].parentElement;
				parent.classList.add('show');
			};
		}else{

			// if target all add all iconbox show class
			for (let i = 0; i < iconBoxElement.length; i++) {
				iconBoxElement[i].classList.add('show');
			};
		};		
	};

	if(!answer){
		// if target dont have filter__btn class
		const dataValue = target.getAttribute('data-findElement').toString();

		// if data attribute add modal show modal
		if(dataValue === 'addmodal'){
			document.getElementById(dataValue).classList.toggle('show');
		};

		// if data attribute icongrid check for compact
		if(dataValue === 'icongrid'){
			(target.classList.contains('compact__btn')) ? document.getElementById(dataValue).classList.add('compact') : document.getElementById(dataValue).classList.remove('compact');
		};

		// if data attribute iconmodal show iconmodal
		if (dataValue === 'iconmodal') {
			document.getElementById(dataValue).classList.toggle('show');
		}
	};	
};

// search filter
searchInput.addEventListener('keyup', showValue);
function showValue() {
	const value = searchInput.value.toLowerCase();
	const iconBox = document.querySelectorAll('.iconbox');
	const iconName = document.querySelectorAll('.iconbox__name');
	
	for (let i = 0; i < iconName.length; i++) {
		const element = iconBox[i].querySelectorAll('.iconbox__name')[0];
			
		if(element){
			let elementText = element.textContent || element.innerHTML;

			if(elementText.toLowerCase().indexOf(value) > -1){
				iconBox[i].style.display = 'flex';
			}else{
				iconBox[i].style.display= 'none';
			}
		}
	}
}