import React, { useState, useEffect } from 'react';
import widgetData from '../widgetData';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWidgetVisiblity, addWidget } from '../utils/widgetSlice';

const Popup = ({ isVisible, onClose }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [tabNo, setTabno] = useState(1);

    const [showAddCategory, setShowAddCategory] = useState(false);
    const [formInputs, setFormInputs] = useState({ widgetName: "", widgetText: "" });
    const [formError, setErrorInputs] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const [selectedWidgetIds, setSelectedWidgetIds] = useState([]);
    const dispatch = useDispatch();
    const selectedWidgets = useSelector(state => state.widgets);

    const handleFormChanges = (e) => {
        const { name, value } = e.target;
        setFormInputs(prev => ({ ...prev, [name]: value }));
    }

    const validate = (values) => {
        const error = {};
        if (!values.widgetName) {
            error.widgetName = "Widget Name required !";
        }
        if (!values.widgetText) {
            error.widgetText = "Widget Text required !";
        }
        return error;
    }

    const showAddCatg = () => {
        setShowAddCategory(true);
    }
    const hideAddCatg = () => {
        setShowAddCategory(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate(formInputs);
        setErrorInputs(errors);
        if (Object.keys(errors).length === 0) {
            setIsSubmit(true);
        }
    }

    const changeTab = (tabNo) => {
        setTabno(tabNo);
    };

    const handleCheckbox = (categoryId, widgetId) => {
        const key = `${categoryId}-${widgetId}`;
        setSelectedWidgetIds(prev =>
            prev.includes(key)
                ? prev.filter(id => id !== key)
                : [...prev, key]
        );
    };

    const handleConfirm = () => {
        Object.entries(selectedWidgets).forEach(([categoryId, category]) => {
            Object.entries(category.widgets).forEach(([widgetId, widget]) => {
                const key = `${categoryId}-${widgetId}`;
                const shouldBeVisible = selectedWidgetIds.includes(key);
                if (widget.widgetVisible !== shouldBeVisible) {
                    dispatch(toggleWidgetVisiblity({ categoryId: parseInt(categoryId), widgetId }));
                }
            });
        });
        onClose();
    };

    useEffect(() => {
        if (isSubmit) {
            const newWidgetId = Date.now().toString();
            dispatch(addWidget({
                categoryId: tabNo,
                widget: {
                    name: formInputs.widgetName,
                    text: formInputs.widgetText,
                },
            }));
            setSelectedWidgetIds(prev => [...prev, `${tabNo}-${newWidgetId}`]);
            setIsSubmit(false);
            setFormInputs({ widgetName: "", widgetText: "" });
            setShowAddCategory(false);
        }
    }, [isSubmit, tabNo, formInputs, dispatch]);

    useEffect(() => {
        if (isVisible && Object.keys(selectedWidgets).length > 0) {
            const currentVisibleWidgetsIDs = Object.entries(selectedWidgets).flatMap(([categoryId, category]) =>
                Object.entries(category.widgets)
                    .filter(([widgetId, widget]) => widget.widgetVisible)
                    .map(([widgetId]) => `${categoryId}-${widgetId}`)
            );
            setSelectedWidgetIds(currentVisibleWidgetsIDs);
        }
    }, [isVisible, selectedWidgets]);

    useEffect(() => {
        console.log("selectedWidgetIds updated:", selectedWidgetIds);
    }, [selectedWidgetIds]);

    useEffect(() => {
        console.log("selectedWidgets updated:", selectedWidgets);
    }, [selectedWidgets]);

    if (!isVisible && !isAnimating) return null;

    return (
        <div
            className={` ${isVisible ? 'z-50 fixed inset-0 bg-black bg-opacity-50' : ''}`}
            onClick={onClose}
        >
            <div
                className={`fixed top-0 right-0 h-full w-2/6 max-w-full z-50 bg-slate-200 shadow-lg transform transition-transform duration-500 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'
                    }`}
                onAnimationEnd={() => !isVisible && setIsAnimating(false)}
                onClick={(e) => e.stopPropagation()}
                style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
            >
                <div className='bg-blue-600 h-10 text-white font-Ramabhadra items-center flex justify-between px-6'>
                    <div className='font-medium text-sm'>Add Widget</div>
                    <button aria-label="Close" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 -0.5 25 25" fill="none">
                            <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z" fill="#ffffff" />
                        </svg>
                    </button>
                </div>
                <div className='flex-1 overflow-y-auto p-4'>
                    <div className='p-4'>
                        Personalize your dashboard by adding the following widgets
                    </div>
                    <div className='px-4'>
                        <div className='flex border-b items-center'>
                            {widgetData.categories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`py-2 px-4 text-sm font-medium ${tabNo === category.id ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                                    onClick={() => changeTab(category.id)}
                                >
                                    {category.name.split(' ')[0]}
                                </button>
                            ))}
                            {!showAddCategory && (<button className='px-2 py-1.5 bg-blue-600 text-white rounded-md text-sm right-10 fixed transition-transform transform hover:scale-105' onClick={showAddCatg}>Add Category +</button>)}
                        </div>

                        {showAddCategory && (
                            <div className='border-t-2 border-b-2 py-3 border-gray-400 mt-2' >
                                <div className='flex space-x-4 '>
                                    <input
                                        type="text"
                                        name="widgetName"
                                        id="widgetName"
                                        value={formInputs.widgetName}
                                        onChange={handleFormChanges}
                                        className='py-1 px-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm'
                                        placeholder='Widget Name...'>
                                    </input>
                                    {formError.widgetName && <p className="text-red-500 text-sm">{formError.widgetName}</p>}
                                    <input
                                        type="text"
                                        name="widgetText"
                                        id="widgetText"
                                        value={formInputs.widgetText}
                                        onChange={handleFormChanges}
                                        className='py-1 px-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm'
                                        placeholder='Widget Text...'>
                                    </input>
                                    {formError.widgetText && <p className="text-red-500 text-sm">{formError.widgetText}</p>}
                                </div>
                                <div className='flex justify-end mt-3 space-x-4'>
                                    <button className='px-2 py-1 bg-gray-50 text-gray-700 rounded-md transition-transform transform hover:scale-105' onClick={hideAddCatg}>Cancel</button>
                                    <button className='px-4 py-1 bg-blue-600 text-white rounded-md transition-transform transform hover:scale-105' onClick={handleSubmit}>Save</button>
                                </div>
                            </div>
                        )}

                        {Object.entries(selectedWidgets).map(([categoryId, category]) => (
                            <div key={categoryId}>
                                {tabNo === parseInt(categoryId) && (
                                    <div className='p-4'>
                                        {Object.entries(category.widgets).map(([widgetId, widget]) => {
                                            const key = `${categoryId}-${widgetId}`;
                                            return (
                                                <div key={key} className='flex items-center space-x-2 mb-2 p-2 border-gray-300 border rounded-md'>
                                                    <input
                                                        type="checkbox"
                                                        id={`widget-${key}`}
                                                        checked={selectedWidgetIds.includes(key)}
                                                        onChange={() => handleCheckbox(categoryId, widgetId)}
                                                    />
                                                    <label htmlFor={`widget-${key}`} className='text-sm'>
                                                        <span className="font-medium">{widget.name}</span> {widget.text}
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='bg-gray-100 py-3 px-4 flex justify-between text-sm'>
                    <div></div>
                    <div className='flex space-x-4'>
                        <button className='px-4 py-2 bg-gray-200 text-gray-700 rounded-md transition-transform transform hover:scale-105' onClick={onClose}>Cancel</button>
                        <button className='px-4 py-2 bg-blue-600 text-white rounded-md transition-transform transform hover:scale-105' onClick={handleConfirm}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
