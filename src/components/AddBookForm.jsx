'use client';
import React from 'react'
import service from '@/appwrite/appwriteConfig'
import { Input, Button, Select, SelectItem, Switch, Textarea } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { languages, generes } from './data'
import Image from 'next/image';
import { useAuth } from '@/contextapi/AuthContext';
import { Controller, useForm } from 'react-hook-form';
const AddBookForm = ({ book }) => {
    
    const { userData } = useAuth();

    const adminId = userData.$id;

    const { register, handleSubmit, watch, getValues, setValue, control } = useForm({
        defaultValues: {

            Title: book?.Title || "",
            author: book?.author || "",
            publisher: book?.publisher || "",
            language: book?.language || "",
            genere: book?.genere || "",
            description: book?.description || "",
            stock: book?.stock || "",
            mrp: book?.mrp || "",
            price: book?.price || "",
            isUsed: book?.isUsed || false,
            isHardCover: book?.isHardCover || false,
        }
    })
    const router = useRouter()

    const submit = async (data) => {
        try {

            if (book) {
                const file = data.image[0] ? await service.uploadFile(data.image[0]) : null

                if (file) {
                    service.deleteFile(book.image)
                }

                const dbBook = await service.updateBook(book.$id, {
                    ...data,
                    image: file ? file.$id : undefined,
                })

                if (dbBook) {
                    router.push('/')
                }

            }
            else {
                console.log('language: ', data.language, ", genere: ", data.genere)
                console.log("no book found")
                const file = await service.uploadFile(data.image[0])
                console.log("File upload response: ", file)

                if (file) {
                    const fileId = file.$id;
                    data.image = fileId;

                    const dbBook = await service.createBook({ ...data, adminId, timestamp: new Date() })
                    if (dbBook) {
                        router.push('/')
                    }
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <form className='p-6' method="post" onSubmit={handleSubmit(submit)}>
                <Input
                    className='mx-12 my-2 w-[50%]'
                    isRequired
                    label="Title"
                    type="text"
                    placeholder="Title"
                    {...register("Title", { required: true })}
                />
                <Input
                    className='mx-12 my-2 w-[50%]'
                    label="Author"
                    type="text"
                    placeholder="Author"
                    {...register("author")}
                />
                <Input
                    className='mx-12 my-2 w-[50%]'
                    label="Publisher"
                    type="text"
                    placeholder="Publisher"
                    {...register("publisher")}
                />
                <Textarea
                    label="Description"
                    placeholder="Enter book description"
                    className="max-w-xs"
                    {...register("description")}
                />
                <Input
                    className='mx-12 my-2 w-[50%]'
                    label="Stock"
                    type="number"
                    placeholder="stock"
                    {...register("stock")}
                />
                <Input
                    className='mx-12 my-2 w-[50%]'
                    label="MRP"
                    type="number"
                    placeholder="MRP"
                    {...register("mrp")}
                />
                <Input
                    className='mx-12 my-2 w-[50%]'
                    label="Price"
                    type="number"
                    placeholder="Price"
                    {...register("price")}
                />
                <div className="flex">
                    <Switch checked={watch('isUsed')} onChange={() => setValue('isUsed', !watch('isUsed'))}>
                        Used Book
                    </Switch>
                    <Switch checked={watch('isHardCover')} onChange={() => setValue('isHardCover', !watch('isHardCover'))}>
                        Hard Cover
                    </Switch>
                </div>
                <div className="flex">
                    <Controller
                        name="language"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Select
                                {...field}
                                items={languages}
                                label="Language"
                                placeholder="Select a language"
                                className="max-w-xs text-black mx-4 my-2 w-[50%]"
                            >
                                {(language) => <SelectItem className='text-black' key={language.value} value={language.value}>{language.label}</SelectItem>}
                            </Select>
                        )}
                    />
                    <Controller
                        name="genere"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Select
                                {...field}
                                items={generes}
                                label="Genere"
                                placeholder="Select a genere"
                                className="max-w-xs text-black mx-4 my-2 w-[50%]"
                            >
                                {(genere) => <SelectItem className='text-black' key={genere.value} value={genere.value}>{genere.label}</SelectItem>}
                            </Select>
                        )}
                    />
                </div>



                <Input
                    label="Cover Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !book })}
                />
                {book && (
                    <div className="w-full mb-4">
                        <Image
                            src={book.image}
                            alt={book.Title}
                            width={500}
                            height={500}
                            objectFit="cover"
                            className="rounded-md"
                        />
                    </div>
                )}


                <Button type="submit" className="w-full">
                    {book ? "Update" : "Submit"}
                </Button>
            </form>
        </div>
    )
}

export default AddBookForm