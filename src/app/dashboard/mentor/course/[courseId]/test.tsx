import { Button } from "@/components/ui/button";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function Test() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Add a New Question</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="question-text">Question Text</Label>
                <Textarea
                  className="h-20"
                  id="question-text"
                  placeholder="Enter the question"
                />
              </div>
              <div>
                <Label>Answers</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="answer-1-correct" />
                      <Label htmlFor="answer-1-correct">Correct</Label>
                    </div>
                    <Input placeholder="Answer 1" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="answer-2-correct" />
                      <Label htmlFor="answer-2-correct">Correct</Label>
                    </div>
                    <Input placeholder="Answer 2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="answer-3-correct" />
                      <Label htmlFor="answer-3-correct">Correct</Label>
                    </div>
                    <Input placeholder="Answer 3" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="answer-4-correct" />
                      <Label htmlFor="answer-4-correct">Correct</Label>
                    </div>
                    <Input placeholder="Answer 4" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="multiple-answers" />
                <Label htmlFor="multiple-answers">
                  Multiple Correct Answers
                </Label>
              </div>
              <Button className="w-full" type="submit">
                Add Question
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
