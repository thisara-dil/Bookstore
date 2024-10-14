import express, { Router } from 'express';
import { Book } from '../models/bookmodel.js';

const router = express.Router();


//root for save a new book
router.post('/',async(request,response)=>{
    try {
        if(!request.body.title || !request.body.author || !request.body.publishyear){
            return response.status(400).send({message: 'send all required fields'});
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishyear: request.body.publishyear
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);

    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    }
})

//root for get all books from db

router.get('/',async(request,response)=>{
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count : books.length,
            data : books
        });
    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    }
});

//root for get one book from db by id

router.get('/id',async(request,response)=>{
    try {
        const {id} = request.params;
        const book = await Book.findById({id});
        return response.status(200).json({book});
    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    }
});


//root for update a book 
router.put('/:id',async(request,response)=>{
    try {
        if(!request.body.title || !request.body.author || !request.body.publishyear){
            return response.status(400).send({message: 'send all required fields'});
        }
        const {id} = request.params;
        const result = await Book.findByIdAndUpdate(id,request.body)
        if(!result){
            return response.status(404).send({message: 'Book not found'});
        }
        return response.status(200).send({message: 'Book updated successfully'});

    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    }
});

//root for delete a book
router.delete('/:id',async(request,response)=>{
    try {
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).send({message: 'Book not found'});
        }
        return response.status(200).send({message: 'Book deleted successfully'});
    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    }
});

export default router;