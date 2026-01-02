import { Star, X, Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface WriteReviewProps {
    productId: number;
    productName: string;
    onClose: () => void;
    onSubmit: (review: NewReview) => void;
}

interface NewReview {
    rating: number;
    title: string;
    content: string;
    photos?: string[];
}

const WriteReview = ({ productId, productName, onClose, onSubmit }: WriteReviewProps) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [photos, setPhotos] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (rating === 0) {
            toast.error("Please select a rating");
            return;
        }

        if (!title.trim() || !content.trim()) {
            toast.error("Please fill in all required fields");
            return;
        }

        onSubmit({
            rating,
            title: title.trim(),
            content: content.trim(),
            photos: photos.length > 0 ? photos : undefined,
        });

        toast.success("Review submitted successfully!");
        onClose();
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            // In a real app, upload to server and get URLs
            // For now, create object URLs
            const newPhotos = Array.from(files).map((file) => URL.createObjectURL(file));
            setPhotos((prev) => [...prev, ...newPhotos].slice(0, 5)); // Max 5 photos
        }
    };

    const removePhoto = (index: number) => {
        setPhotos((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="card-3d max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-display text-2xl font-bold text-foreground">
                            Write a Review
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-secondary rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <p className="text-muted-foreground mb-6">
                        Reviewing: <span className="font-semibold text-foreground">{productName}</span>
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Rating */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Rating <span className="text-destructive">*</span>
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="transition-transform hover:scale-110"
                                    >
                                        <Star
                                            className={`w-8 h-8 ${star <= (hoverRating || rating)
                                                    ? "fill-primary text-primary"
                                                    : "text-muted-foreground"
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>
                            {rating > 0 && (
                                <p className="text-sm text-muted-foreground mt-2">
                                    {rating === 5 && "Excellent!"}
                                    {rating === 4 && "Good"}
                                    {rating === 3 && "Average"}
                                    {rating === 2 && "Below Average"}
                                    {rating === 1 && "Poor"}
                                </p>
                            )}
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Review Title <span className="text-destructive">*</span>
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Sum up your experience"
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                maxLength={100}
                            />
                            <p className="text-xs text-muted-foreground mt-1">{title.length}/100</p>
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Your Review <span className="text-destructive">*</span>
                            </label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Tell us about your experience with this product"
                                rows={6}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                maxLength={1000}
                            />
                            <p className="text-xs text-muted-foreground mt-1">{content.length}/1000</p>
                        </div>

                        {/* Photos */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Add Photos (Optional)
                            </label>
                            <div className="space-y-3">
                                {photos.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {photos.map((photo, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={photo}
                                                    alt={`Upload ${index + 1}`}
                                                    className="w-20 h-20 object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removePhoto(index)}
                                                    className="absolute -top-2 -right-2 p-1 bg-destructive text-white rounded-full hover:bg-destructive/80"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {photos.length < 5 && (
                                    <label className="glass p-4 rounded-lg border-2 border-dashed border-border hover:border-primary cursor-pointer transition-colors flex items-center justify-center gap-2">
                                        <Upload className="w-5 h-5 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">
                                            Upload Photos ({photos.length}/5)
                                        </span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handlePhotoUpload}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex gap-3 pt-4">
                            <Button type="submit" variant="gold" className="flex-1">
                                Submit Review
                            </Button>
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WriteReview;
