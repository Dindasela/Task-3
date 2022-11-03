document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('inputBook');
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addAlat();
  });

  
});  

const alats = [];
const RENDER_EVENT = 'render-alat';

function addAlat() {
  const textTitle = document.getElementById('inputBookTitle').value;
  const textAuthor = document.getElementById('inputBookAuthor').value;
  const tahunRilis = document.getElementById('inputBookYear').value;
  const generatedID = generateId();
  let alatObject = generatealatObject(generatedID, textTitle, textAuthor,tahunRilis, false);
  alats.push(alatObject);
 
  document.dispatchEvent(new Event(RENDER_EVENT));
 
}

function generateId() {
  return +new Date();
}
 
function generatealatObject(id, title,author,year,isCompleted) {
  return {
    id,
    title,
    author,
    year,
    isCompleted
  }
}

document.addEventListener(RENDER_EVENT, function () {
  console.log(alats);
});

function makeBook(alatObject) {

  const alatTitle = document.createElement('h3');
  alatTitle.innerText = alatObject.title;
 
  const authorName = document.createElement('p');
  authorName.innerText = 'Penulis : '+ alatObject.author;
 
  const yearRelease = document.createElement('p');
  yearRelease.innerText = 'Tahun : '+ alatObject.year;
 
  const alatContainer = document.createElement('article');
  alatContainer.classList.add('alat_list');
  alatContainer.append(alatTitle,authorName,yearRelease);
 
  const alatArticle = document.createElement('div');
  alatArticle.classList.add('alat_item');
  alatArticle.append(alatContainer);
  alatArticle.setAttribute('id', `alat-${alatObject.id}`);
  

  if (alatObject.isCompleted === false) {
    let checkBook = document.createElement('div');
    checkBook.classList.add('action');

    let doneBook = document.createElement('button');
    doneBook.classList.add('green');
    doneBook.innerText = 'Selesai Dibaca';
    doneBook.style = 'visibility:hidden;'

    doneBook.addEventListener('click', function () {
      addTaskToCompleted(alatObject.id);
    });

    let removeBook = document.createElement('button');
    removeBook.classList.add('red');
    removeBook.innerText = 'Hapus Buku';
    removeBook.style = 'visibility:hidden;'

    removeBook.addEventListener('click', function () {
      removeTaskFromCompleted(alatObject.id);
    });
    checkBook.append(doneBook,removeBook);
 
    alatArticle.append(checkBook);
  } else {
    let checkBook = document.createElement('div');
    checkBook.classList.add('action');

    let doneBook = document.createElement('button');
    doneBook.classList.add("green");
    doneBook.innerText = 'Selesai Dibaca';
    doneBook.style = 'visibility:hidden;'

    doneBook.addEventListener('click', function () {
      addTaskToCompleted(alatObject.id);
    });

    let removeBook = document.createElement('button');
    removeBook.classList.add("red");
    removeBook.innerText = 'Hapus Buku';
    removeBook.style = 'visibility:hidden;'

    removeBook.addEventListener('click', function () {
      removeTaskFromCompleted(alatObject.id);
    });

    checkBook.append(doneBook,removeBook);
 
    alatArticle.append(checkBook);

   
    
  }
 



  return alatArticle;
}

function findBook(alatId) {
  for (const alatItem of alats) {
    if (alatItem.id === alatId) {
      return alatItem;
    }
  }
  return null;
}

function addTaskToCompleted (alatId) {
  const alatTarget = findBook(alatId);
 
  if (alatTarget == null) return;
 
  alatTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
 
}

function removeTaskFromCompleted(alatId) {
  const alatTarget = findBookIndex(alatId);
 
  if (alatTarget === -1) return;
 
  alats.splice(alatTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  
}
 
 
function undoTaskFromCompleted(alatId) {
  const alatTarget = findBook(alatId);
 
  if (alatTarget == null) return;
 
  alatTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  
}

function findBookIndex(alatId) {
  for (const index in alats) {
    if (alats[index].id === alatId) {
      return index;
    }
  }
 
  return -1;
}


document.addEventListener(RENDER_EVENT, function () {
  console.log(alats);
  const uncompletedBookList = document.getElementById('incompleteBookshelfList');
  uncompletedBookList.innerHTML = '';

  const completedBookList = document.getElementById('completeBookshelfList');
  completedBookList.innerHTML = '';
 
  for (const alatItem of alats) {
    const alatElement = makeBook(alatItem);
    if (!alatItem.isCompleted)
      uncompletedBookList.append(alatElement);

    else
      completedBookList.append(alatElement);

  }

});
