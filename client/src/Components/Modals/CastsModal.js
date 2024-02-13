import React, { useEffect, useState } from 'react';
import MainModal from './MainModal';
import { Input } from '../UsedInputs';
import Uploder from '../Uploder';
import toast from 'react-hot-toast';
import { addCastAction, updateCastAction } from '../../Redux/Actions/MoviesActions';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import * as yup from "yup";
import { InlineError } from '../Notification/Error';
import { ImagePreview } from '../imagePreview';

function CastsModal({ modalOpen, setModalOpen, cast }) {

    const dispatch = useDispatch();
    const [castImage, setCastImage] = useState("");
    const generateId = Math.floor(Math.random() * 100000000);
    const image = castImage ? castImage : cast?.image;

    // validate cast
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                name: yup.string().required("Вкажіть ім'я актора😉"),
            })
        ),
    });

    // on submit
    const onSubmit = (data) => {
        if (cast) {
            // if cast is not null then update cast
            dispatch(
                updateCastAction({
                    ...data,
                    image: image,
                    id: cast.id,
                })
            );
            toast.success("Актора успішно оновлено✨");
        } else {
            // else create cast
            dispatch(
                addCastAction({
                    ...data,
                    image: image,
                    id: generateId,
                })
            );
            toast.success("Актора успішно створено🥰");
        }
        reset();
        setCastImage("");
        setModalOpen(false);
    };

    useEffect(() => {
        if (cast) {
            setValue("Ім'я", cast?.name);
        }
    }, [cast, setValue]);


    return (
        <MainModal modalOpen={ modalOpen } setModalOpen={ setModalOpen }>
            <div className='inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl'>
                <h2 className='text-3xl font-bold'>
                    { cast ? 'Редагування актора' : 'Створення актора' }
                </h2>
                <form onSubmit={ handleSubmit(onSubmit) } className='flex flex-col gap-6 text-left mt-6'>
                    <div className="w-full">
                        <Input
                            label="Ім'я актора"
                            placeholder="Тарас Цимбалюк"
                            type="text"
                            name="name"
                            register={ register("name") }
                            bg={ true }
                        />
                        { errors.name && <InlineError text={ errors.name.message } /> }
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-border font-semibold text-sm">Фото актора</p>
                        <Uploder setImageUrl={ setCastImage } />
                        <ImagePreview
                            image={ image ? image : "/images/user.jfif" }
                            name="castImage"
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={ () => setModalOpen(false) }
                        className="w-full flex-rows gap-4 py-3 text-lg transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
                    >
                        { cast ? "Редагування" : "Додати" }
                    </button>
                </form>
            </div>
        </MainModal>
    );
}

export default CastsModal;
