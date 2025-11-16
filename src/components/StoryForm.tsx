import { useState, FormEvent } from 'react';
import { Story } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface StoryFormProps {
  onSubmit: (story: Omit<Story, 'id' | 'createdAt'>) => void;
}

export default function StoryForm({ onSubmit }: StoryFormProps) {
  const [author, setAuthor] = useState('');
  const [designer, setDesigner] = useState('');
  const [reference, setReference] = useState('');
  const [story, setStory] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!author.trim() || !designer.trim() || !reference.trim() || !story.trim()) {
      return;
    }

    onSubmit({
      author: author.trim(),
      designer: designer.trim(),
      reference: reference.trim(),
      story: story.trim(),
    });

    // Reset form
    setAuthor('');
    setDesigner('');
    setReference('');
    setStory('');
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Add New Story</CardTitle>
        <CardDescription>
          Fill in the details below to add a new story to your collection.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="author">Author *</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="designer">Designer *</Label>
            <Input
              id="designer"
              value={designer}
              onChange={(e) => setDesigner(e.target.value)}
              placeholder="Enter designer name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reference">Reference *</Label>
            <Input
              id="reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Enter reference"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="story">Story *</Label>
            <Textarea
              id="story"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Enter your story here..."
              rows={10}
              required
              className="min-h-[200px]"
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Add Story
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
