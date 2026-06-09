'use client';

import { useState, useTransition } from 'react';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { updateAboutSettings } from '@/lib/actions/about';

interface AboutFormProps {
  initialSettings: {
    about_mission: string;
    about_vision: string;
    about_milestone_1: string;
    about_milestone_2: string;
    about_milestone_3: string;
  };
}

export function AboutForm({ initialSettings }: AboutFormProps) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [mission, setMission] = useState(initialSettings.about_mission);
  const [vision, setVision] = useState(initialSettings.about_vision);
  const [milestone1, setMilestone1] = useState(initialSettings.about_milestone_1);
  const [milestone2, setMilestone2] = useState(initialSettings.about_milestone_2);
  const [milestone3, setMilestone3] = useState(initialSettings.about_milestone_3);

  const save = (data: typeof initialSettings) => {
    startTransition(async () => {
      const result = await updateAboutSettings(data);
      if (result.error) showToast(result.error, 'error');
      else showToast('Saved successfully.', 'success');
    });
  };

  return (
    <div className="max-w-2xl space-y-8">
      <section className="space-y-4 rounded-[12px] border border-canvas-soft bg-canvas p-6">
        <h2 className="text-base font-medium text-ink">Mission &amp; vision</h2>
        <Textarea label="Mission statement" value={mission} onChange={(e) => setMission(e.target.value)} />
        <Textarea label="Vision statement" value={vision} onChange={(e) => setVision(e.target.value)} />
        <Button
          variant="dark"
          loading={isPending}
          onClick={() => save({ ...initialSettings, about_mission: mission, about_vision: vision })}
        >
          Save
        </Button>
      </section>

      <section className="space-y-4 rounded-[12px] border border-canvas-soft bg-canvas p-6">
        <h2 className="text-base font-medium text-ink">Milestone cards</h2>
        <Input label="Milestone 1" value={milestone1} onChange={(e) => setMilestone1(e.target.value)} />
        <Input label="Milestone 2" value={milestone2} onChange={(e) => setMilestone2(e.target.value)} />
        <Input label="Milestone 3" value={milestone3} onChange={(e) => setMilestone3(e.target.value)} />
        <Button
          variant="dark"
          loading={isPending}
          onClick={() =>
            save({
              about_mission: mission,
              about_vision: vision,
              about_milestone_1: milestone1,
              about_milestone_2: milestone2,
              about_milestone_3: milestone3,
            })
          }
        >
          Save
        </Button>
      </section>

    </div>
  );
}
