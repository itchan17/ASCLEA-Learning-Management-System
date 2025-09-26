import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
    FiArrowLeft, 
    FiMail, 
    FiClock, 
    FiCheckCircle, 
    FiXCircle, 
    FiTrash2, 
    FiEdit2,
    FiUser,
    FiMessageSquare,
    FiCalendar,
    FiTag,
    FiSend
} from 'react-icons/fi';

export default function ContactShow({ contact }) {
    const [status, setStatus] = useState(contact.status);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

    const statusOptions = [
        { value: 'new', label: 'New', icon: <FiClock className="mr-2" />, color: 'blue' },
        { value: 'read', label: 'Read', icon: <FiCheckCircle className="mr-2" />, color: 'gray' },
        { value: 'replied', label: 'Replied', icon: <FiSend className="mr-2" />, color: 'green' },
        { value: 'closed', label: 'Closed', icon: <FiXCircle className="mr-2" />, color: 'red' },
    ];

    const handleStatusChange = (newStatus) => {
        if (newStatus !== status) {
            setIsUpdatingStatus(true);
            setStatus(newStatus);
            
            router.patch(route('admin.contacts.status', contact.id), {
                status: newStatus,
            }, {
                preserveScroll: true,
                onFinish: () => setIsUpdatingStatus(false),
            });
        }
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this contact submission?')) {
            setIsDeleting(true);
            router.delete(route('admin.contacts.destroy', contact.id), {
                onFinish: () => setIsDeleting(false),
            });
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AdminLayout>
            <Head title={`Contact from ${contact.name}`} />
            
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            href={route('admin.contacts.index')}
                            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                        >
                            <FiArrowLeft className="mr-1 h-4 w-4" />
                            Back to all contacts
                        </Link>
                    </div>

                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Contact Information
                                    </h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        Submitted on {formatDate(contact.created_at)}
                                    </p>
                                </div>
                                <div className="mt-3 sm:mt-0">
                                    <div className="flex space-x-3">
                                        <div className="relative">
                                            <select
                                                value={status}
                                                onChange={(e) => handleStatusChange(e.target.value)}
                                                disabled={isUpdatingStatus}
                                                className={`appearance-none bg-${statusOptions.find(s => s.value === status)?.color}-50 border border-${statusOptions.find(s => s.value === status)?.color}-300 rounded-md py-2 pl-3 pr-10 text-${statusOptions.find(s => s.value === status)?.color}-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${statusOptions.find(s => s.value === status)?.color}-500`}
                                            >
                                                {statusOptions.map((option) => (
                                                    <option 
                                                        key={option.value} 
                                                        value={option.value}
                                                        className="bg-white text-gray-900"
                                                    >
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                window.location.href = `mailto:${contact.email}?subject=Re: Contact Form Submission`;
                                            }}
                                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            <FiMail className="mr-2 h-4 w-4" />
                                            Reply
                                        </button>
                                        <button
                                            onClick={handleDelete}
                                            disabled={isDeleting}
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                                        >
                                            <FiTrash2 className="mr-2 h-4 w-4" />
                                            {isDeleting ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                                        <FiUser className="mr-2 h-4 w-4 text-gray-400" />
                                        Name
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {contact.name}
                                    </dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                                        <FiMail className="mr-2 h-4 w-4 text-gray-400" />
                                        Email
                                    </dt>
                                    <dd className="mt-1 text-sm text-blue-600">
                                        <a href={`mailto:${contact.email}`} className="hover:underline">
                                            {contact.email}
                                        </a>
                                    </dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                                        <FiCalendar className="mr-2 h-4 w-4 text-gray-400" />
                                        Submitted
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {formatDate(contact.created_at)}
                                    </dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                                        <FiTag className="mr-2 h-4 w-4 text-gray-400" />
                                        Status
                                    </dt>
                                    <dd className="mt-1">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${statusOptions.find(s => s.value === status)?.color}-100 text-${statusOptions.find(s => s.value === status)?.color}-800`}>
                                            {statusOptions.find(s => s.value === status)?.icon}
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </span>
                                    </dd>
                                </div>
                                <div className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500 flex items-start">
                                        <FiMessageSquare className="mr-2 h-4 w-4 text-gray-400 mt-0.5" />
                                        Message
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 whitespace-pre-line">
                                        {contact.message}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        
                        {/* Reply section */}
                        <div className="bg-gray-50 px-4 py-5 sm:px-6 border-t border-gray-200">
                            <h4 className="text-sm font-medium text-gray-500 mb-4">Reply to {contact.name}</h4>
                            <div className="flex space-x-3">
                                <div className="flex-1">
                                    <textarea
                                        rows={4}
                                        name="reply"
                                        id="reply"
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder={`Reply to ${contact.name}...`}
                                        defaultValue={`Hello ${contact.name.split(' ')[0]},\n\nThank you for reaching out to us. `}
                                    />
                                </div>
                                <div className="flex-shrink-0">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        onClick={() => {
                                            const replyText = document.getElementById('reply').value;
                                            window.location.href = `mailto:${contact.email}?subject=Re: Contact Form Submission&body=${encodeURIComponent(replyText)}`;
                                        }}
                                    >
                                        <FiSend className="mr-2 h-4 w-4" />
                                        Send Reply
                                    </button>
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">
                                This will open your default email client with a pre-filled message.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
