'use client'

import { useParams } from 'next/navigation'
import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { axios } from '@/lib/axios'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from './ui/card' // adjust if your exports differ
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Star } from 'lucide-react'

type WriteReviewProps = {
  onSubmitted?: () => void
}

export const WriteReview = ({ onSubmitted }: WriteReviewProps) => {
  const { id } = useParams() // room id
  const [rating, setRating] = useState<number>(0)
  const [hoverRating, setHoverRating] = useState<number>(0)
  const [reviewText, setReviewText] = useState<string>('')
  const [submitting, setSubmitting] = useState<boolean>(false)

  const canSubmit = rating >= 1 && reviewText.trim().length > 0

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!id) {
        toast.error('Missing room id')
        return
      }
      if (!canSubmit) {
        toast.error('Rating and review text are required')
        return
      }
      setSubmitting(true)
      try {
        await axios.post('/api/reviews', {
          rating,
          reviewText,
          room: id,
        })
        toast.success('Review submitted')
        setRating(0)
        setReviewText('')
        if (onSubmitted) onSubmitted()
      } catch (err: any) {
        if (err?.response?.status === 401) {
          toast.error('You need to be logged in to submit a review')
        } else {
          toast.error('Failed to submit review')
        }
        console.error('WriteReview error', err)
      } finally {
        setSubmitting(false)
      }
    },
    [rating, reviewText, id, canSubmit, onSubmitted]
  )

  const renderStars = (interactive = true) => {
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }).map((_, i) => {
          const idx = i + 1
          const filled = hoverRating
            ? idx <= hoverRating
            : idx <= rating
          return (
            <button
              key={idx}
              type="button"
              aria-label={`Rate ${idx} star`}
              onMouseEnter={() => interactive && setHoverRating(idx)}
              onMouseLeave={() => interactive && setHoverRating(0)}
              onClick={() => interactive && setRating(idx)}
              className="p-0.5"
            >
              {filled ? (
                <Star className="w-5 h-5 text-yellow-500 bg-yellow-500" />
              ) : (
                <Star className="w-5 h-5 text-yellow-500/30" />
              )}
            </button>
          )
        })}
        <span className="ml-2 text-sm">{rating ? `${rating}/5` : 'Rate this room'}</span>
      </div>
    )
  }

  return (
    <Card className="border mt-4">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div>
            <CardTitle className="text-xl">Write a Review</CardTitle>
            <p className="text-sm text-gray-500">Help others by sharing your experience</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Your Rating</label>
            {renderStars(true)}
            {rating === 0 && (
              <p className="text-xs text-red-500 mt-1">Rating is required</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium" htmlFor="reviewText">
              Review
            </label>
            <Textarea
              id="reviewText"
              placeholder="Write what you liked or what could improve..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
            />
            {reviewText.trim().length === 0 && (
              <p className="text-xs text-red-500 mt-1">Review text is required</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Button className='cursor-pointer' type="submit" disabled={!canSubmit || submitting}>
              {submitting ? 'Submitting...' : 'Submit Review'}
            </Button>
            {rating > 0 && (
              <button
                type="button"
                className="text-sm underline"
                onClick={() => setRating(0)}
              >
                Clear rating
              </button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
