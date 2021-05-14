import './styles/styles.css';
const root = document.getElementById('root')!;

const URL = 'http://chordgenerator.net/';

const button = document.getElementById('submit')!;
button.addEventListener('click', async (event) => {
  event.preventDefault();

  const prevImage = document.getElementById('image')!;
  if (prevImage) prevImage.remove();

  const prevError = document.getElementById('error');
  if (prevError) prevError.remove();

  try {
    const name = encodeURIComponent(getChordName());
    const size = getImageSize();
    const fretString = getFretPositionString();
    const fingerString = getFingerPositionString();
    const fullUrl = `${URL}${name}.png?p=${fretString}&f=${fingerString}&s=${size}`;
    console.log(fullUrl);

    const image = document.createElement('img');
    image.onerror = imageNotFound;
    image.src = fullUrl;
    image.id = 'image';
    image.classList.add('image');

    root.appendChild(image);
  } catch (e) {
    const error = document.createElement('p');
    error.innerText = e.message;
    error.id = 'error';
    error.classList.add('error');
    root.appendChild(error);
  }
});

const imageNotFound = () => {
  const prevError = document.getElementById('error');
  if (prevError) prevError.remove();
  const prevImage = document.getElementById('image')!;
  if (prevImage) prevImage.remove();
  const error = document.createElement('p');
  error.innerText = 'Unknown error';
  error.id = 'error';
  error.classList.add('error');
  root.appendChild(error);
};

const getChordName = () => {
  const chordNameInput: any = document.getElementById('chordName');
  const chordName = chordNameInput.value;
  if (chordName === '') throw new Error('Chord name cannot be empty');
  return chordName;
};

const getImageSize = () => {
  const imageSizeInput: any = document.getElementById('imageSize');
  const imageSize = +imageSizeInput.value;
  if (imageSize === NaN) throw new Error('Image size must be a number');
  if (imageSize > 10 || imageSize <= 0)
    throw new Error('Image size must be between 1 and 10 (inclusive)');
  return imageSize;
};

const getFretPositionString = () => {
  const fretInputNames = [
    'fretLowE',
    'fretA',
    'fretD',
    'fretG',
    'fretB',
    'fretHighE',
  ];
  const fretValues = fretInputNames.map((id) => {
    const fretInput: any = document.getElementById(id);
    return fretInput.value;
  });
  fretValues.forEach((value) => {
    if (value === 'x') return;
    const fretNumber: number = parseInt(value);

    if (isNaN(fretNumber) || fretNumber < 0 || fretNumber > 21)
      throw new Error(
        "Fret number must be either 'x', or a number between 0 and 21"
      );
  });
  return fretValues.join('-');
};

const getFingerPositionString = () => {
  const fingerInputNames = [
    'fretLowEFinger',
    'fretAFinger',
    'fretDFinger',
    'fretGFinger',
    'fretBFinger',
    'fretHighEFinger',
  ];
  const allowedValues = ['1', '2', '3', '4', 'T', '-'];
  const fingerValues = fingerInputNames.map((id) => {
    const fingerInput: any = document.getElementById(id);
    return fingerInput.value;
  });
  fingerValues.forEach((value) => {
    if (allowedValues.includes(value)) return;
    throw new Error(
      "Finger value must be '-', 'T', or a number between 1 and 4 (inclusive)"
    );
  });
  return fingerValues.join('');
};
