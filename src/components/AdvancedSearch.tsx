import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Mic, MicOff, X, Clock, TrendingUp, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface AdvancedSearchProps {
    onClose?: () => void;
}

const AdvancedSearch = ({ onClose }: AdvancedSearchProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [voiceSupported, setVoiceSupported] = useState(true);
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);
    const recognitionRef = useRef<any>(null);

    // Product suggestions database
    const productSuggestions = [
        "Hi-Vis Safety Jacket",
        "Work Trousers",
        "Safety Boots",
        "Corporate Polo Shirt",
        "Hard Hat",
        "Safety Gloves",
        "Reflective Vest",
        "Work Coveralls",
        "Steel Toe Boots",
        "Safety Glasses",
        "Hi-Vis Trousers",
        "Fleece Jacket",
        "Waterproof Jacket",
        "Work Shirt",
        "Cargo Pants",
        "Safety Harness",
        "Ear Protection",
        "Face Mask",
        "Winter Gloves",
        "Thermal Underwear",
    ];

    const popularSearches = [
        "Hi-Vis Jacket",
        "Work Boots",
        "Safety Equipment",
        "Corporate Uniforms",
        "Winter Workwear",
    ];

    // Load recent searches from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("recentSearches");
        if (saved) {
            try {
                setRecentSearches(JSON.parse(saved));
            } catch (e) {
                console.error("Error loading recent searches:", e);
            }
        }
    }, []);

    // Initialize speech recognition
    useEffect(() => {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;

        if (!SpeechRecognition) {
            console.log('Speech recognition not supported');
            setVoiceSupported(false);
            return;
        }

        try {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';
            recognition.maxAlternatives = 1;

            recognition.onstart = () => {
                console.log('Voice recognition started');
                setIsListening(true);
            };

            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                console.log('Voice recognition result:', transcript);
                setSearchTerm(transcript);
                setIsListening(false);
                toast.success(`Heard: "${transcript}"`);
            };

            recognition.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);

                switch (event.error) {
                    case 'not-allowed':
                    case 'service-not-allowed':
                        toast.error('🎤 Microphone access denied. Please allow microphone in browser settings.');
                        break;
                    case 'no-speech':
                        toast.error('No speech detected. Please try again.');
                        break;
                    case 'network':
                        toast.error('Network error. Check your internet connection.');
                        break;
                    case 'aborted':
                        // User stopped it, don't show error
                        break;
                    default:
                        toast.error('Voice search failed. Try typing instead.');
                }
            };

            recognition.onend = () => {
                console.log('Voice recognition ended');
                setIsListening(false);
            };

            recognitionRef.current = recognition;
            setVoiceSupported(true);
        } catch (error) {
            console.error('Failed to initialize speech recognition:', error);
            setVoiceSupported(false);
        }

        return () => {
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.abort();
                } catch (e) {
                    // Ignore cleanup errors
                }
            }
        };
    }, []);

    // Update suggestions based on search term
    useEffect(() => {
        if (searchTerm.length > 0) {
            const matches = productSuggestions.filter(item =>
                item.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSuggestions(matches.slice(0, 8));
        } else {
            setSuggestions([]);
        }
    }, [searchTerm]);

    // Focus input on mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const toggleVoiceSearch = () => {
        if (!voiceSupported || !recognitionRef.current) {
            toast.error('🎤 Voice search not supported. Use Chrome, Edge, or Safari.');
            return;
        }

        if (isListening) {
            try {
                recognitionRef.current.stop();
                toast.info('Voice search stopped');
            } catch (error) {
                console.error('Error stopping recognition:', error);
                setIsListening(false);
            }
        } else {
            try {
                recognitionRef.current.start();
                toast.info('🎤 Listening... Speak now!', { duration: 3000 });
            } catch (error: any) {
                console.error('Error starting recognition:', error);
                setIsListening(false);

                if (error.message && error.message.includes('already started')) {
                    toast.error('Voice search already active');
                } else {
                    toast.error('Failed to start voice search. Check microphone permissions.');
                }
            }
        }
    };

    const saveToRecentSearches = (term: string) => {
        const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem("recentSearches", JSON.stringify(updated));
    };

    const handleSearch = (term: string) => {
        if (term.trim()) {
            saveToRecentSearches(term);
            navigate(`/products?search=${encodeURIComponent(term)}`);
            onClose?.();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex(prev =>
                prev < suggestions.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                handleSearch(suggestions[selectedIndex]);
            } else if (searchTerm) {
                handleSearch(searchTerm);
            }
        } else if (e.key === "Escape") {
            onClose?.();
        }
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem("recentSearches");
        toast.success("Recent searches cleared");
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4">
            <div className="w-full max-w-2xl">
                {/* Search Box */}
                <div className="card-3d p-2 mb-4">
                    <div className="flex items-center gap-2">
                        <Search className="w-5 h-5 text-muted-foreground ml-2" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search for products, categories, or brands..."
                            className="flex-1 px-3 py-3 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-lg"
                        />

                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        )}

                        <button
                            onClick={toggleVoiceSearch}
                            disabled={!voiceSupported}
                            className={`p-2 rounded-lg transition-all ${!voiceSupported
                                    ? "opacity-50 cursor-not-allowed"
                                    : isListening
                                        ? "bg-red-500 text-white animate-pulse"
                                        : "hover:bg-secondary text-muted-foreground"
                                }`}
                            title={voiceSupported ? "Voice Search" : "Voice search not supported in this browser"}
                        >
                            {isListening ? (
                                <MicOff className="w-5 h-5" />
                            ) : (
                                <Mic className="w-5 h-5" />
                            )}
                        </button>

                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-secondary rounded-lg transition-colors mr-1"
                        >
                            <X className="w-5 h-5 text-muted-foreground" />
                        </button>
                    </div>

                    {/* Voice not supported warning */}
                    {!voiceSupported && (
                        <div className="mt-2 p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-orange-500" />
                            <p className="text-xs text-orange-500">
                                Voice search requires Chrome, Edge, or Safari
                            </p>
                        </div>
                    )}
                </div>

                {/* Results */}
                <div className="card-3d p-4 max-h-[60vh] overflow-y-auto">
                    {/* Smart Suggestions */}
                    {suggestions.length > 0 && (
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Sparkles className="w-4 h-4 text-primary" />
                                <h3 className="font-semibold text-foreground">Smart Suggestions</h3>
                            </div>
                            <div className="space-y-1">
                                {suggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSearch(suggestion)}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-all ${index === selectedIndex
                                                ? "bg-primary text-white"
                                                : "hover:bg-secondary text-foreground"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Search className="w-4 h-4 opacity-50" />
                                            <span>{suggestion}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Recent Searches */}
                    {!searchTerm && recentSearches.length > 0 && (
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                    <h3 className="font-semibold text-foreground">Recent Searches</h3>
                                </div>
                                <button
                                    onClick={clearRecentSearches}
                                    className="text-xs text-primary hover:underline"
                                >
                                    Clear all
                                </button>
                            </div>
                            <div className="space-y-1">
                                {recentSearches.map((search, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSearch(search)}
                                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-secondary text-foreground transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Clock className="w-4 h-4 opacity-50" />
                                            <span>{search}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Popular Searches */}
                    {!searchTerm && (
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <TrendingUp className="w-4 h-4 text-primary" />
                                <h3 className="font-semibold text-foreground">Popular Searches</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {popularSearches.map((search, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSearch(search)}
                                        className="px-4 py-2 glass rounded-full text-sm hover:bg-primary hover:text-white transition-all"
                                    >
                                        {search}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* No Results */}
                    {searchTerm && suggestions.length === 0 && (
                        <div className="text-center py-12">
                            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                            <p className="text-muted-foreground mb-2">No suggestions found</p>
                            <p className="text-sm text-muted-foreground">
                                Try searching for "Hi-Vis Jacket" or "Work Boots"
                            </p>
                        </div>
                    )}
                </div>

                {/* Keyboard Shortcuts */}
                <div className="mt-4 text-center">
                    <p className="text-xs text-muted-foreground">
                        Press <kbd className="px-2 py-1 bg-secondary rounded text-xs">↑</kbd>{" "}
                        <kbd className="px-2 py-1 bg-secondary rounded text-xs">↓</kbd> to navigate,{" "}
                        <kbd className="px-2 py-1 bg-secondary rounded text-xs">Enter</kbd> to select,{" "}
                        <kbd className="px-2 py-1 bg-secondary rounded text-xs">Esc</kbd> to close
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdvancedSearch;
