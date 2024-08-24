import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Component() {
  const questions = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      tags: ["Array", "Hash Table"],
    },
    {
      id: 2,
      title: "Add Two Numbers",
      difficulty: "Medium",
      tags: ["Linked List", "Math"],
    },
    {
      id: 3,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      tags: ["String", "Sliding Window"],
    },
    {
      id: 4,
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      tags: ["Array", "Binary Search"],
    },
    {
      id: 5,
      title: "Longest Palindromic Substring",
      difficulty: "Medium",
      tags: ["String", "Dynamic Programming"],
    },
  ];

  const difficultyColors: Record<string, string> = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
  };

  return (
    <div className="max-h-screen overflow-y-scroll bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="sticky top-0 z-10 border-b bg-background">
          <h1>Practice Questions</h1>
        </header>
        <div className="flex flex-col gap-8 md:flex-row">
          <main className="flex-1">
            <div className="grid gap-4">
              {questions.map((question) => (
                <div
                  key={question.id}
                  className="rounded-lg p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <Link href={`/practice/question/${question.id}`}>
                      <h3 className="text-lg font-semibold">
                        {question.title}
                      </h3>
                    </Link>
                    <Badge className={difficultyColors[question.difficulty]}>
                      {question.difficulty}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {question.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
