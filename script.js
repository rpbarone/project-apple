const CHOSEN_CARD = document.getElementById('chosen-card');
const CARD_LIMIT = document.getElementById('available-limit');
const CARDS = document.getElementById('select-card');
const POP = document.getElementById('popover');
const INSURE_LABEL = document.getElementById('insure-label');
const YES_INSURANCE = document.getElementById('radio1');
const NO_INSURANCE = document.getElementById('radio2');
const INSURANCE_FORM = document.getElementById('insurance-form');
const PHONE_PRICE = 679.99;
const INSURANCE_PRICE = 108.16;
const INTEREST_RATE = 0.0192;
const TOTAL_PURCHASE_AMOUNT = document.getElementById('total-amount');
const INSTALLMENTS = document.getElementById('installments');
const nodeOptList = document.querySelectorAll('option');
let installmentsList = Array.from(nodeOptList).splice(3);
let balanceCard = 0;
let amount = PHONE_PRICE;

//Functions

const displayBalanceCard = () => {

	if (CARDS.value === 'cardOne') {
		balanceCard = 5696.2;
		CHOSEN_CARD.textContent = "**** 5576";
		CARD_LIMIT.textContent = formatAmount.format(balanceCard);
		POP.style.display = "block";

	} else if (CARDS.value === 'cardTwo') {
		balanceCard = 173.94;
		CHOSEN_CARD.textContent = "**** 2308";
		CARD_LIMIT.textContent = formatAmount.format(balanceCard);
		POP.style.display = "block";
	}

}


const insuranceOk = () => {
		amount = PHONE_PRICE + INSURANCE_PRICE;
		INSURANCE_FORM.classList.add('form-group-insurance');
		INSURE_LABEL.textContent = 'Additional purchase amount: +' + formatAmount.format(INSURANCE_PRICE);
		optValues(amount);
		updateAmount(amount);
		totalPurchase();
}

const insuranceCancel = () => {
	amount = PHONE_PRICE;
	INSURANCE_FORM.classList.remove('form-group-insurance');
	INSURE_LABEL.innerHTML = 
	'12 month-Insurance?'
	+ '<small>' 
	+ '*protection against theft and falls' 
	+ '</small>';
	optValues(amount);
	updateAmount(amount);
	totalPurchase();
}


/*const formatAmount = (amt) => {
	amt = amount;
	amount = '$' + amount;
	return amount;
}*/

const formatAmount = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2
})




const optValues = (amt) => {

	installmentsList.map((opt, i) => {
		let value = amt / i;
		let valueWithInterest = amt / i * (1 + INTEREST_RATE)**i;

		if (i === 1) {
			opt.textContent = i + "x " + value;
			opt.value = value.toFixed(2);
		} else if (!(i === 0)) {
			opt.textContent = i + "x " + valueWithInterest.toFixed(2);
			opt.value = valueWithInterest.toFixed(2) * i;
		}

	})


}



const totalPurchase = () => {

		if (INSTALLMENTS.value === 'Parcelamento') {
				amount =  PHONE_PRICE;
		} else {
			amount = INSTALLMENTS.value;
			updateAmount(amount);
		}	
}



const updateAmount = (amt) => {
		TOTAL_PURCHASE_AMOUNT.textContent = formatAmount.format(amt);
}



//callbacks
updateAmount(amount);
optValues(amount);
CARDS.addEventListener('change', displayBalanceCard )
YES_INSURANCE.addEventListener('change', insuranceOk )
NO_INSURANCE.addEventListener('change', insuranceCancel)
INSTALLMENTS.addEventListener('change', totalPurchase)


//change pages
document.querySelector('.btn-click').addEventListener('click', () => {
	document.querySelector('.text-iphone').style.display = "none";
	document.querySelector('form').style.display = "block";
})

document.querySelector('.btn-buy').addEventListener('click', () => {
	document.querySelector('form').style.display = "none";
	document.querySelector('#popover').style.display = "none";
	document.querySelector('#purchase-wait').style.display = "block";

	setTimeout(() => {
		document.querySelector('#purchase-wait').style.display = "none";

		if (amount <= balanceCard) {
			document.querySelector('#purchase-successful').style.display = "block";
			balanceCard = balanceCard - amount;
		} else if (amount > balanceCard) {
			document.querySelector('#purchase-fail').style.display = "block";
		}

	},3000)
})
//AMOUNT.textContent = (PHONE_PRICE + INSURANCE_PRICE + TAX_PHONE) / 12;