import { postDataWithAuth } from '@/Helpers/httpRequest';
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';

const AddContentPage = () => {
    const [isSeries, setIsSeries] = useState(false)
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const imgRef = useRef<HTMLInputElement>(null);
    const imgTitleRef = useRef<HTMLInputElement>(null);
    const imgThumbRef = useRef<HTMLInputElement>(null);
    const imgVerticalRef = useRef<HTMLInputElement>(null);
    const durationRef = useRef<HTMLInputElement>(null);
    const trailerRef = useRef<HTMLInputElement>(null);
    const movieRef = useRef<HTMLInputElement>(null);
    const yearRef = useRef<HTMLInputElement>(null);
    const limitRef = useRef<HTMLInputElement>(null);
    const genreRef = useRef<HTMLInputElement>(null);
    const isSeriesRef = useRef<HTMLInputElement>(null);
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSeries(event.target.checked);
    };

    const loginHandler = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            const content = {
                title: titleRef.current?.value || "",
                description: descriptionRef.current?.value || "",
                img: imgRef.current?.value || "",
                imgTitle: imgTitleRef.current?.value || "",
                imgThumb: imgThumbRef.current?.value || "",
                imgVertical: imgVerticalRef.current?.value || "",
                trailer: trailerRef.current?.value || "",
                movie: movieRef.current?.value || "",
                duration: durationRef.current?.value || "",
                year: yearRef.current?.value || "",
                limit: limitRef.current?.value || "",
                genre: genreRef.current?.value || "",
                isSeries: isSeries
            }
            const data = await postDataWithAuth("/api/v1/content/addcontent", { content })
            if (data) {
                toast.success(`Added - ${data.title}`)
            }
        } catch (error) {

        }
    };
    return (
        <div className="text-white w-full flex items-center flex-col bg-cover min-h-screen md:bg-[url('../assets/netflix-bg.jpg')]">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className='max-w-md  bg-none md:bg-black bg-opacity-80 rounded-lg md:px-6 md:py-6 mt-20 z-10'>
                <h1 className="text-3xl md:text-5xl font-bold text-center">Add Content</h1>
                <form onSubmit={(e) => loginHandler(e)} className="grid grid-cols-2 gap-2 mt-5 mb-5">
                    <input
                        type="text"
                        placeholder="Title"
                        ref={titleRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md focus:outline-none focus:bg-stone-500"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        ref={descriptionRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                    />
                    <input
                        type="text"
                        placeholder="img link"
                        ref={imgRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                    />
                    <input
                        type="text"
                        placeholder="imgTitle link"
                        ref={imgTitleRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                    />
                    <input
                        type="text"
                        placeholder="imgThumb link"
                        ref={imgThumbRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                    />
                    <input
                        type="text"
                        placeholder="imgVertical link"
                        ref={imgVerticalRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                    />
                    <input
                        type="text"
                        placeholder="Trailer link"
                        ref={trailerRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                    />
                    <input
                        type="text"
                        placeholder="Movie"
                        ref={movieRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                    />
                    <input
                        type="text"
                        placeholder="Duration"
                        ref={durationRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                    />
                    <input
                        type="text"
                        placeholder="Year"
                        ref={yearRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                    />
                    <input
                        type="text"
                        placeholder="Age limit"
                        ref={limitRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                    />
                    <input
                        type="text"
                        placeholder="Genre"
                        ref={genreRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                    />
                    <div className='flex flex-col'>
                        <label>isSeries</label><input
                            type="checkbox"
                            id="isSeries"
                            ref={isSeriesRef}
                            onChange={handleCheckboxChange}
                            className="block w-10 h-5 py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                        /></div>
                    <button type="submit" className="w-full py-3 px-4 bg-red-600 text-white rounded-md focus:outline-none mt-8 ">Add</button>
                </form>
            </div>
        </div>

    )
}

export default AddContentPage