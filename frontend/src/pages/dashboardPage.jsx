import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Popup from '../components/popup';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWidgetVisiblity } from '../utils/widgetSlice';

const DashboardPage = () => {
    const [popupState, setpopupShow] = useState(false);
    const dispatch = useDispatch();
    const selectedWidgets = useSelector(state => state.widgets);

    const handleCross = (categoryId, widgetId) => {
        dispatch(toggleWidgetVisiblity({ categoryId, widgetId }));
    };

    const showPopup = () => {
        setpopupShow(true);
    };

    const closePopup = () => {
        setpopupShow(false);
    };

    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='bg-blue-50 flex-1 overflow-y-auto'>
                <div className='flex p-7 pb-2 items-center justify-between'>
                    <div className='text-blue-600 font-Ramabhadra font-medium text-lg'>CNAPP Dashboard</div>
                    <div className='bg-white px-3 py-2 rounded-md border-2 transition-transform transform hover:scale-105 hover:bg-blue-600 hover:text-white'>
                        <button className='font-Poppins text-sm font-medium' onClick={showPopup}>Add Widget +</button>
                    </div>
                </div>
                {Object.entries(selectedWidgets).map(([categoryId, category]) => (
                    <div key={categoryId} className='px-10 py-5'>
                        <div className='text-gray-700 font-Ramabhadra font text-md mb-4'>{category.name}</div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {Object.entries(category.widgets).map(([widgetId, widget]) => (
                                widget.widgetVisible && (
                                    <div key={widgetId} className='bg-white h-44 rounded-lg p-4 shadow-sm relative hover:shadow-2xl hover:shadow-blue-500/70 transition-shadow'>
                                        <button
                                            className='absolute top-2 right-2 text-gray-400 hover:text-gray-700'
                                            onClick={() => handleCross(categoryId, widgetId)}
                                        >
                                            &#10005;
                                        </button>
                                        <div className='text-lg font-medium text-gray-700'>
                                            {widget.name}
                                        </div>
                                        <div className='text-sm text-gray-500'>
                                            {widget.text}
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Popup isVisible={popupState} onClose={closePopup} />
        </div>
    );
}

export default DashboardPage;