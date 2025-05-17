
export default function Login({ isOpen, onClose}: {isOpen: boolean, onClose: () => void}) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80">
            <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" required 
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green focus:border-green"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" required 
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green focus:border-green"/>
                    </div>
                    <button type="submit" 
                        className="w-full bg-green text-white py-2 px-4 rounded hover:bg-green-dark">Login</button>
                </form>
            <button onClick={onClose} 
            className="text-green">Bam vo day</button>
            </div>
        </div>
    );
}