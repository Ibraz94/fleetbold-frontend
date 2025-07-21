// pages/expenses/upload.jsx
import { useState, useCallback, useEffect } from 'react';
import { toast } from '@/components/ui';
import { apiCreateExpenses, apiOcrUpload } from '@/services/ExpensesService';
import { EXPENSE_TYPES, EXPENSE_STATUS } from './index';
import { Button, Input, Select, DatePicker } from '@/components/ui';
import { HiOutlineCheck } from 'react-icons/hi';
import { useNavigate } from 'react-router';

export default function UploadExpenses() {
    const navigate = useNavigate();
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [ocrHtml, setOcrHtml] = useState('');
    const [editableOcrText, setEditableOcrText] = useState('');
    const [detectedAmounts, setDetectedAmounts] = useState([]);
    const [formData, setFormData] = useState({
        date_occured: '',
        description: '',
        type: '',
        status: '',
        amount: '',
        receipt_url: '',
    });
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);

    const handleInputChange = (field) => (e) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleDateChange = (field) => (date) => {
        setFormData((prev) => ({ ...prev, [field]: date }));
    };

    const highlightFormattedText = (text) => {
        return text
            .replace(/(\$\d{1,3}(,\d{3})*(\.\d{2})?)/g, '<mark style="background:#FEF3C7;">$1</mark>')
            .replace(/(\b\d{2}\/\d{2}\/\d{2,4}\b|\b\d{4}-\d{2}-\d{2}\b)/g, '<mark style="background:#DBEAFE;">$1</mark>')
            .replace(/(\b\d{5,}\b)/g, '<mark style="background:#FDE68A;">$1</mark>');
    };

    const extractAmountsFromHtml = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const textContent = doc.body.textContent;
        const matches = [...textContent.matchAll(/\$\d{1,3}(,\d{3})*(\.\d{2})?/g)].map(m => m[0]);
        return [...new Set(matches)];
    };

    const handleFileUpload = useCallback(async (files) => {
        const validFiles = [];

        Array.from(files).forEach(file => {
            const ext = file.name.split('.').pop().toLowerCase();
            const isValidType = ['csv', 'pdf', 'jpg', 'jpeg', 'png'].includes(ext);
            const isValidSize = file.size <= 10 * 1024 * 1024;

            if (isValidType && isValidSize) {
                validFiles.push(file);
            }
        });

        if (validFiles.length === 0) {
            toast.push(<div>'Invalid or no files selected.'</div>, { placement: 'top-end', type: 'error' });
            return;
        }

        setUploadedFiles(validFiles);
        setFormData((prev) => ({
            ...prev,
            receipt_url: validFiles.map(file => file.name).join(', '),
        }));
        setProcessing(true);

        const formData = new FormData();
        validFiles.forEach(file => formData.append('image', file));

        try {
            const response = await apiOcrUpload(formData);
            const ocrResults = response.data || response;

            if (ocrResults.html) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = ocrResults.html;
                const plainText = tempDiv.innerText || tempDiv.textContent || '';
                const formatted = highlightFormattedText(plainText);

                setEditableOcrText(plainText);
                setOcrHtml(formatted);
                const detected = extractAmountsFromHtml(ocrResults.html);
                setDetectedAmounts(detected);
            } else {
                setEditableOcrText('');
                setOcrHtml('');
                setDetectedAmounts([]);
            }
        } catch (error) {
            toast.push(<div>{error.response?.data?.message}</div> || <div>Failed to process OCR upload</div>, {
                placement: 'top-end',
                type: 'error',
            });
        } finally {
            setProcessing(false);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                date_occured: formData.date_occured ? new Date(formData.date_occured).toISOString() : null,
                amount: parseFloat(formData.amount.replace('$', '')) || 0,
                date_occurred: new Date().toISOString(),
            };

            await apiCreateExpenses(payload);

            toast.push(<div>✅ Expense added successfully!</div>, {
                placement: 'top-end',
                type: 'success',
                duration: 3000,
            });

            setFormData({
                date_occured: '',
                description: '',
                type: '',
                status: '',
                amount: '',
                receipt_url: '',
            });

            setUploadedFiles([]);
            setEditableOcrText('');
            setOcrHtml('');
            setDetectedAmounts([]);
            navigate('/fleetBold/expenses')

        } catch (error) {
            toast.push(<div>{error.response?.data?.message}</div> || <div>❌ Failed to create expense.</div>, {
                placement: 'top-end',
                type: 'error',
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold mb-6">Upload Expenses</h1>

            <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-blue-500 transition-all"
            >
                <span className="text-gray-600 mb-2">Click to choose files</span>
                <span className="text-sm text-gray-400">Supported: PDF, JPG, PNG (Max: 1MB)</span>
                <input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                />
            </label>

            {uploadedFiles.length > 0 && processing && (
                <div className="mt-4 text-sm text-gray-600 italic">
                    {uploadedFiles.length} file{uploadedFiles.length > 1 ? 's' : ''} uploaded. Fetching data from image...
                </div>
            )}

            {/* {ocrHtml && (
                <div className="mt-6">
                    <h4 className="font-semibold mb-2">OCR Results (Editable + Highlighted)</h4>
                    <div
                        className="border rounded p-4 bg-white text-sm font-mono max-h-[300px] overflow-auto whitespace-pre-wrap"
                        contentEditable
                        suppressContentEditableWarning={true}
                        dangerouslySetInnerHTML={{ __html: ocrHtml }}
                        onInput={(e) => setEditableOcrText(e.currentTarget.innerText)}
                    />
                </div>
            )} */}

            {ocrHtml && (
                <form onSubmit={handleSubmit} className="mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="date_occured" className="text-sm font-medium">Date</label>
                            <DatePicker
                                placeholder="Select date"
                                value={formData.date_occured}
                                onChange={handleDateChange('date_occured')}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="description" className="text-sm font-medium">Description</label>
                            <Input
                                placeholder="Enter description"
                                value={formData.description}
                                onChange={handleInputChange('description')}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="type" className="text-sm font-medium">Booking type</label>
                            <Select
                                placeholder="Select booking type"
                                options={EXPENSE_TYPES}
                                value={EXPENSE_TYPES.find(option => option.value === formData.type)}
                                onChange={(option) => setFormData(prev => ({ ...prev, type: option?.value || '' }))}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="status" className="text-sm font-medium">Status</label>
                            <Select
                                placeholder="Select Status"
                                options={EXPENSE_STATUS}
                                value={EXPENSE_STATUS.find(option => option.value === formData.status)}
                                onChange={(option) => setFormData(prev => ({ ...prev, status: option?.value || '' }))}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="amount" className="text-sm font-medium">Amount</label>
                            <Select
                                placeholder="$25.00"
                                options={detectedAmounts.map(val => ({ label: val, value: val }))}
                                value={{ label: formData.amount, value: formData.amount }}
                                onChange={(option) => setFormData(prev => ({ ...prev, amount: option?.value || '' }))}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="receipt_url" className="text-sm font-medium">File</label>
                            <Input
                                placeholder="expenses.pdf"
                                value={formData.receipt_url}
                                onChange={handleInputChange('receipt_url')}
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3 pb-6">
                        <Button
                            variant="solid"
                            type="submit"
                            icon={<HiOutlineCheck />}
                            loading={loading}
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Add Expense'}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}
