import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FiSearch, FiFilter, FiTrash2, FiEye, FiMail, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';

export default function ContactsIndex({ contacts, filters }) {
    const [selectedContacts, setSelectedContacts] = useState([]);
    const { data, setData, get, processing } = useForm({
        search: filters.search || '',
        status: filters.status || '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route('admin.contacts.index', {
            search: data.search,
            status: data.status,
        }), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleStatusFilter = (status) => {
        setData('status', status);
        get(route('admin.contacts.index', {
            status,
            search: data.search,
        }), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const toggleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedContacts(contacts.data.map(contact => contact.id));
        } else {
            setSelectedContacts([]);
        }
    };

    const toggleSelectContact = (id) => {
        setSelectedContacts(prev => 
            prev.includes(id) 
                ? prev.filter(contactId => contactId !== id)
                : [...prev, id]
        );
    };

    const deleteSelected = () => {
        if (confirm('Are you sure you want to delete the selected contacts?')) {
            router.post(route('admin.contacts.bulk-destroy'), {
                ids: selectedContacts,
            }, {
                onSuccess: () => setSelectedContacts([]),
            });
        }
    };

    const getStatusBadge = (status) => {
        const statusClasses = {
            new: 'bg-blue-100 text-blue-800',
            read: 'bg-gray-100 text-gray-800',
            replied: 'bg-green-100 text-green-800',
            closed: 'bg-red-100 text-red-800',
        };

        const statusIcons = {
            new: <FiClock className="mr-1" />,
            read: <FiEye className="mr-1" />,
            replied: <FiMail className="mr-1" />,
            closed: <FiXCircle className="mr-1" />,
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status]}`}>
                {statusIcons[status]}
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <AdminLayout>
            <Head title="Contact Submissions" />
            
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Contact Submissions</h1>
                        <div className="mt-4 md:mt-0">
                            <Link
                                href={route('admin.contacts.index')}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FiRefreshCw className="mr-2 h-4 w-4" />
                                Refresh
                            </Link>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white shadow rounded-lg p-4 mb-6">
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
                                <div className="flex-1">
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiSearch className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="search"
                                            id="search"
                                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="Search contacts..."
                                            value={data.search}
                                            onChange={(e) => setData('search', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <FiFilter className="mr-2 h-4 w-4" />
                                        {processing ? 'Searching...' : 'Search'}
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleStatusFilter('')}
                                    className={`px-3 py-1 text-sm rounded-full ${!data.status ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                                >
                                    All
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleStatusFilter('new')}
                                    className={`px-3 py-1 text-sm rounded-full flex items-center ${data.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                                >
                                    <FiClock className="mr-1" />
                                    New
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleStatusFilter('read')}
                                    className={`px-3 py-1 text-sm rounded-full flex items-center ${data.status === 'read' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                                >
                                    <FiEye className="mr-1" />
                                    Read
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleStatusFilter('replied')}
                                    className={`px-3 py-1 text-sm rounded-full flex items-center ${data.status === 'replied' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                                >
                                    <FiMail className="mr-1" />
                                    Replied
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleStatusFilter('closed')}
                                    className={`px-3 py-1 text-sm rounded-full flex items-center ${data.status === 'closed' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                                >
                                    <FiXCircle className="mr-1" />
                                    Closed
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Contact list */}
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        {selectedContacts.length > 0 && (
                            <div className="bg-blue-50 px-4 py-3 sm:px-6 flex justify-between items-center">
                                <p className="text-sm text-blue-700">
                                    {selectedContacts.length} selected
                                </p>
                                <button
                                    type="button"
                                    onClick={deleteSelected}
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    <FiTrash2 className="mr-1.5 h-4 w-4" />
                                    Delete Selected
                                </button>
                            </div>
                        )}
                        <ul className="divide-y divide-gray-200">
                            {contacts.data.length === 0 ? (
                                <li className="px-4 py-6 sm:px-6 text-center text-gray-500">
                                    No contact submissions found.
                                </li>
                            ) : (
                                contacts.data.map((contact) => (
                                    <li key={contact.id} className="hover:bg-gray-50">
                                        <div className="px-4 py-4 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <input
                                                        id={`contact-${contact.id}`}
                                                        name={`contact-${contact.id}`}
                                                        type="checkbox"
                                                        checked={selectedContacts.includes(contact.id)}
                                                        onChange={() => toggleSelectContact(contact.id)}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
                                                    />
                                                    <div className="min-w-0 flex-1 flex items-center">
                                                        <p className="text-sm font-medium text-blue-600 truncate">
                                                            {contact.name}
                                                        </p>
                                                        <p className="ml-2 flex-shrink-0 text-sm text-gray-500">
                                                            &lt;{contact.email}&gt;
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="ml-2 flex-shrink-0 flex">
                                                    {getStatusBadge(contact.status)}
                                                    <Link
                                                        href={route('admin.contacts.show', contact.id)}
                                                        className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                    >
                                                        <FiEye className="h-4 w-4 mr-1" />
                                                        View
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="mt-2 sm:flex sm:justify-between">
                                                <div className="sm:flex">
                                                    <p className="flex items-center text-sm text-gray-500">
                                                        {contact.message.substring(0, 100)}{contact.message.length > 100 ? '...' : ''}
                                                    </p>
                                                </div>
                                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                    <p>
                                                        {new Date(contact.created_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                        
                        {/* Pagination */}
                        {contacts.links && (
                            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">{contacts.from || 0}</span> to{' '}
                                            <span className="font-medium">{contacts.to || 0}</span> of{' '}
                                            <span className="font-medium">{contacts.total}</span> results
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                            {contacts.links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                        link.active
                                                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
