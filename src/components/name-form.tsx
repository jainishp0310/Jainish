'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { generateNameAction } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {pending ? 'Generating...' : 'Generate Name'}
    </Button>
  );
}

export function NameForm({ setHeartName }: { setHeartName: (name: string) => void }) {
  const [state, formAction] = useFormState(generateNameAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message === 'success' && state.heartName) {
      setHeartName(state.heartName);
      toast({
        title: 'Name Generated!',
        description: `The hearts now say "${state.heartName}".`,
      });
    } else if (state.message && state.message !== 'success') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, setHeartName, toast]);

  return (
    <Card className="w-full max-w-sm bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="font-headline">Customize the Name</CardTitle>
        <CardDescription>
          What name should appear in the hearts? Provide ideas for our AI. Try mentioning "hetanshi"!
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="promptConditions">Your Ideas</Label>
            <Input id="promptConditions" name="promptConditions" placeholder="e.g., a romantic name" required />
          </div>
          {state.errors?.promptConditions && (
            <p className="text-sm font-medium text-destructive">{state.errors.promptConditions[0]}</p>
          )}
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
