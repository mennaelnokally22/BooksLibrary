import { Book, Author } from './classes.js';
let bookNums = 0;
let count = 0;
let books = [];
let bookName;
let bookPrice;
let publishDate;
let authorName;
let authorEmail;
let editMode = [];
let isCancelled = [];
let counter = -1;
let num = 1;
let tds = [];
document.getElementById('btnStart').addEventListener('click', () => {
    bookNums = document.getElementById('booksNum').value;
    document.getElementById('mainSec').style.display = 'none';
    document.getElementById('dataSec').style.display = 'block';
});
document.querySelector('.myform').addEventListener('submit', (e) => {
    e.preventDefault();
});
document.getElementById('dataForm').addEventListener('submit', (e) => {
    e.preventDefault();
    bookName = document.getElementById('bookName').value;
    bookPrice = document.getElementById('price').value;
    publishDate = document.getElementById('publishDate').value;
    authorName = document.getElementById('authorName').value;
    authorEmail = document.getElementById('authorEmail').value;
    if (count < bookNums) {
        let author = new Author(authorName, authorEmail);
        books[count] = new Book(bookName, bookPrice, publishDate, author);
        document.getElementById('dataForm').reset();
        num += 1;
        document.getElementById('bookNum').value = num;
        count += 1;
        console.log(books);
    }
    if (count >= bookNums) {
        document.getElementById('dataSec').style.display = 'none';
        document.getElementById('showSec').style.display = 'block';
        for (let i = 0; i < books.length; i++) {
            document.getElementById('tbody').innerHTML += `<tr data-tr="${i}" class ="trs"data-book="${books[i].bookName}">
            <th scope="row">${Number(i + 1)}</th>
            <td data-target="bookName" class="tdData">${books[i].bookName}</td>
            <td data-target="price" class="tdData">${books[i].price}</td>
            <td data-target="date" class="tdData">${books[i].date}</td>
            <td data-target="authorName" class="tdData">${books[i].author.authorName}</td>
            <td data-target="authorEmail" class="tdData">${books[i].author.authorEmail}</td>
            <td class="edBtns">
            <button type="button" class="btn btn-info btnEdit" data-ed="${i}">Edit</button>
            <button type="button" class="btn btn-danger" id="btnDelete" data-del="${i}">Delete</button></td>
            <td class="saveBtns hidden">
            <button type="button" class="btn btn-info btnSave" data-save="${i}">Save</button>
            <button type="button" class="btn btn-danger btnCancel" data-cancel="${i}">Cancel</button></td>
            </tr>`;
            editMode[i] = false;
            isCancelled[i] = false;
        }
        document.getElementById('tbody').addEventListener('click', (e) => {
            let ele = e.target;
            let indx;
            let deletedIndx;
            if (ele.matches('#btnDelete')) {
                deletedIndx = Number(ele.dataset.del);
                name = e.target.parentNode.parentNode.dataset.book;
                ele.parentNode.parentNode.parentNode.removeChild(ele.parentNode.parentNode);
                let bookIndx = books.findIndex((book) => book.bookName === name);
                books.splice(bookIndx, 1);
                console.log(books);
                let trs = document.querySelectorAll('.trs');
                for (let i = 0; i < trs.length; i++) {
                    trs[i].dataset.tr = i;
                    trs[i].dataset.book = books[i].bookName;
                }
            }
            else if (ele.matches('.btnEdit') || ele.matches('.btnSave') || ele.matches('.btnCancel')) {
                if (ele.matches('.btnEdit')) {
                    indx = Number(ele.parentNode.parentNode.dataset.tr);
                    editMode[indx] = true;
                }
                else if (ele.matches('.btnSave')) {
                    editMode[indx] = false;
                    indx = Number(ele.parentNode.parentNode.dataset.tr);
                    tds = ele.parentNode.parentNode.querySelectorAll('.tdData');
                    books[indx].bookName = tds[0].textContent;
                    books[indx].price = tds[1].textContent;
                    books[indx].date = tds[2].textContent;
                    books[indx].author.authorName = tds[3].textContent;
                    books[indx].author.authorEmail = tds[4].textContent;
                    console.log(books);
                }
                else if (ele.matches('.btnCancel')) {
                    indx = Number(ele.parentNode.parentNode.dataset.tr);
                    editMode[indx] = false;
                    isCancelled[indx] = true;
                    tds = ele.parentNode.parentNode.querySelectorAll('.tdData');
                    tds[0].textContent = books[indx].bookName;
                    tds[1].textContent = books[indx].price;
                    tds[2].textContent = books[indx].date;
                    tds[3].textContent = books[indx].author.authorName;
                    tds[4].textContent = books[indx].author.authorEmail;
                    console.log(books);
                }
                document.querySelectorAll('.edBtns')[indx].classList.toggle('hidden');
                document.querySelectorAll('.saveBtns')[indx].classList.toggle('hidden');


            }
        });
        document.getElementById('tbody').addEventListener('dblclick', (e) => {
            let ele = e.target;
            if (ele.matches('[data-target]') && editMode[Number(ele.closest('tr').dataset.tr)] === true) {
                ele.insertAdjacentHTML('beforeend', `<input type="text" class="form-control inputData " id="dataInp">`);
                document.getElementById('dataInp').value = document.getElementById('dataInp').closest('td').textContent;
                document.getElementById('dataInp').focus();
                document.getElementById('dataInp').addEventListener('keydown',function(e)
                {
                    let ele = e.target.parentNode.parentNode;
                    let val = document.getElementById('dataInp').closest('td').dataset.target;
                    let inputVal = document.getElementById('dataInp').value;
                    let ind = ele.dataset.tr;
                    if(val === "bookName" || val ==="authorName")
                    {
                        document.querySelectorAll('.btnSave')[ind].disabled = false;
                        if(inputVal === "" || inputVal.length < 3)
                        {
                            document.getElementById('dataInp').classList.remove('is-valid');
                            document.getElementById('dataInp').classList.add('is-invalid');
                            document.querySelectorAll('.btnSave')[ind].disabled = true;
        
                        }
                        else
                        {
                            document.getElementById('dataInp').classList.remove('is-invalid');
                            document.getElementById('dataInp').classList.add('is-valid');
                        }
                    }
                    else if(val === "price")
                    {
                        document.querySelectorAll('.btnSave')[ind].disabled = false;
                        if(inputVal === null || isNaN(inputVal)||inputVal < "10"||inputVal > "200")
                        {
                            document.getElementById('dataInp').classList.remove('is-valid');
                            document.getElementById('dataInp').classList.add('is-invalid');
                            document.querySelectorAll('.btnSave')[ind].disabled = true;
                        }
                        else
                        {
                            document.getElementById('dataInp').classList.remove('is-invalid');
                            document.getElementById('dataInp').classList.add('is-valid');
                        }
                    }
                    else if (val === "authorEmail")
                    {
                        document.querySelectorAll('.btnSave')[ind].disabled = false;
                        if(inputVal === null || !validateEmail(inputVal))
                        {
                            document.getElementById('dataInp').classList.remove('is-valid');
                            document.getElementById('dataInp').classList.add('is-invalid');
                            document.querySelectorAll('.btnSave')[ind].disabled = true;
                        }
                        else
                        {
                            document.getElementById('dataInp').classList.remove('is-invalid');
                            document.getElementById('dataInp').classList.add('is-valid');
                        }
                    }
                    else if (val === "date")
                    {
                        document.querySelectorAll('.btnSave')[ind].disabled = false;
                        if(inputVal === null || !validateDate(inputVal))
                        {
                            document.getElementById('dataInp').classList.remove('is-valid');
                            document.getElementById('dataInp').classList.add('is-invalid');
                            document.querySelectorAll('.btnSave')[ind].disabled = true;
                        }
                        else
                        {
                            document.getElementById('dataInp').classList.remove('is-invalid');
                            document.getElementById('dataInp').classList.add('is-valid');
                        }
                    }
                });
                document.getElementById('dataInp').addEventListener('blur', function () {

                    ele.textContent = this.value;

                });
            }
        });

    }
});
function validateEmail(email) 
{
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

function validateDate(date)
{
    var re = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
    return re.test(date);
}