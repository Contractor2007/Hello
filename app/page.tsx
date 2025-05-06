import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MessageSquare, Heart, SmilePlus, Quote } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center gap-8">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <Quote className="h-12 w-12 mx-auto text-blue-500" />
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Share Your <span className="text-blue-600">Thoughts</span>, <br />
          Connect Through <span className="text-blue-600">Words</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A vibrant community for sharing inspiring quotes, expressing feelings, and meaningful conversations.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/login">
            <Button className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Start Sharing
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" className="gap-2">
              <SmilePlus className="h-4 w-4" />
              Join Community
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full grid md:grid-cols-3 gap-8 mt-12">
        <div className="border rounded-lg p-6 space-y-4 bg-blue-50">
          <Quote className="h-8 w-8 text-blue-600" />
          <h3 className="text-xl font-semibold">Express Yourself</h3>
          <p className="text-muted-foreground">
            Share quotes that inspire you and moments that move you with our community.
          </p>
        </div>

        <div className="border rounded-lg p-6 space-y-4 bg-pink-50">
          <Heart className="h-8 w-8 text-pink-600" />
          <h3 className="text-xl font-semibold">Spread Positivity</h3>
          <p className="text-muted-foreground">
            Like, comment, and share uplifting content that resonates with your soul.
          </p>
        </div>

        <div className="border rounded-lg p-6 space-y-4 bg-purple-50">
          <MessageSquare className="h-8 w-8 text-purple-600" />
          <h3 className="text-xl font-semibold">Meaningful Chats</h3>
          <p className="text-muted-foreground">
            Connect through private messages and group conversations about what matters.
          </p>
        </div>
      </section>

      {/* Testimonial */}
      <section className="text-center mt-12 max-w-2xl">
        <blockquote className="text-xl italic text-muted-foreground">
          &quot;This platform helped me find my tribe - people who appreciate the same quotes and share similar feelings.&quot;
        </blockquote>
        <p className="mt-4 font-medium">— Sarah Johnson, Writer</p>
      </section>

      {/* Final CTA */}
      <section className="mt-12 text-center">
        <h2 className="text-2xl font-bold">Ready to share your world?</h2>
        <div className="mt-6">
          <Link href="/register">
            <Button size="lg" className="gap-2">
              <SmilePlus className="h-4 w-4" />
              Join Now
            </Button>
          </Link>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Connect with like-minded individuals today.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
