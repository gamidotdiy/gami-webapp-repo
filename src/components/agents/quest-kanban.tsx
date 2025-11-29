"use client";

import { useMemo, useState } from "react";
import { PencilLine, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ColumnKey = "proposed" | "active" | "completed";

type Quest = {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  reward: number;
  column: ColumnKey;
};

const initialQuestData: Record<ColumnKey, Quest[]> = {
  proposed: [
    { id: "q-001", title: "Recruit 10 verified creators", difficulty: "Medium", reward: 4800, column: "proposed" },
    { id: "q-002", title: "Win 3 social battlegrounds", difficulty: "Hard", reward: 7200, column: "proposed" },
  ],
  active: [
    { id: "q-010", title: "Secure 20k XP in 24h", difficulty: "Hard", reward: 9500, column: "active" },
    { id: "q-011", title: "Finish 5 eco runs", difficulty: "Medium", reward: 5200, column: "active" },
  ],
  completed: [
    { id: "q-100", title: "Mentor 50 newcomers", difficulty: "Easy", reward: 2600, column: "completed" },
  ],
};

const columnMeta: Record<ColumnKey, { title: string; gradient: string; description: string }> = {
  proposed: {
    title: "AI Proposed",
    gradient: "from-[#6D7CFF] to-[#4318FF]",
    description: "Awaiting supervisor approval",
  },
  active: {
    title: "Active",
    gradient: "from-[#6AD2FF] to-[#4318FF]",
    description: "Currently live to users",
  },
  completed: {
    title: "Completed",
    gradient: "from-[#AAB8FF] to-[#6159FF]",
    description: "Historical quests",
  },
};

export function QuestKanban() {
  const [columns, setColumns] = useState(initialQuestData);
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null);
  const [rewardDraft, setRewardDraft] = useState(0);
  const [difficultyDraft, setDifficultyDraft] = useState<Quest["difficulty"]>("Medium");

  const openModal = (quest: Quest) => {
    setEditingQuest(quest);
    setRewardDraft(quest.reward);
    setDifficultyDraft(quest.difficulty);
  };

  const closeModal = () => setEditingQuest(null);

  const handleSave = () => {
    if (!editingQuest) return;
    setColumns((prev) => {
      const updated = { ...prev };
      updated[editingQuest.column] = prev[editingQuest.column].map((quest) =>
        quest.id === editingQuest.id
          ? { ...quest, reward: rewardDraft, difficulty: difficultyDraft }
          : quest,
      );
      return updated;
    });
    closeModal();
  };

  const totalCounts = useMemo(
    () => ({
      proposed: columns.proposed.length,
      active: columns.active.length,
      completed: columns.completed.length,
    }),
    [columns],
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A3AED0]">
            Quest Agent Workflow
          </p>
          <h2 className="text-2xl font-semibold text-[#2B3674]">
            Quest Generation Console
          </h2>
        </div>
        <div className="flex items-center gap-3 text-sm text-[#A3AED0]">
          <span>AI Proposed · {totalCounts.proposed}</span>
          <span>Active · {totalCounts.active}</span>
          <span>Completed · {totalCounts.completed}</span>
        </div>
      </header>
      <div className="grid gap-5 lg:grid-cols-3">
        {(Object.keys(columns) as ColumnKey[]).map((columnKey) => {
          const meta = columnMeta[columnKey];
          const quests = columns[columnKey];
          return (
            <div key={columnKey} className="rounded-[24px] bg-white p-4 shadow-[0px_25px_60px_rgba(160,174,211,0.35)]">
              <div
                className={cn(
                  "rounded-[18px] p-4 text-white",
                  "bg-gradient-to-br",
                  meta.gradient,
                )}
              >
                <p className="text-sm uppercase tracking-[0.2em] opacity-80">{meta.title}</p>
                <p className="text-base text-white/70">{meta.description}</p>
                <p className="mt-4 text-4xl font-semibold">{quests.length}</p>
              </div>
              <div className="mt-4 space-y-3">
                {quests.map((quest) => (
                  <div
                    key={quest.id}
                    className="rounded-2xl border border-[#EEF2FF] bg-[#F9FBFF] p-4 shadow-[0px_12px_24px_rgba(67,24,255,0.08)]"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A3AED0]">
                          #{quest.id}
                        </p>
                        <p className="mt-1 text-base font-semibold text-[#2B3674]">{quest.title}</p>
                      </div>
                      <button
                        aria-label="Edit quest"
                        className="rounded-full bg-white p-2 text-[#4318FF] shadow-[0px_12px_24px_rgba(67,24,255,0.15)] transition hover:-translate-y-0.5"
                        onClick={() => openModal(quest)}
                      >
                        <PencilLine className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-semibold",
                          quest.difficulty === "Easy" && "bg-[#EAFBF5] text-[#1BA97F]",
                          quest.difficulty === "Medium" && "bg-[#FFF5E6] text-[#D97706]",
                          quest.difficulty === "Hard" && "bg-[#FDEEF3] text-[#D52941]",
                        )}
                      >
                        {quest.difficulty}
                      </span>
                      <p className="text-[#4318FF] font-semibold">{quest.reward.toLocaleString()} XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {editingQuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-[30px] bg-white p-8 shadow-[0px_35px_80px_rgba(15,23,42,0.35)]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A3AED0]">Adjust Quest</p>
                <h3 className="text-xl font-semibold text-[#2B3674]">{editingQuest.title}</h3>
              </div>
              <button
                aria-label="Close editor"
                className="rounded-full border border-[#E4E9FB] p-2"
                onClick={closeModal}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-[#2B3674]">
                Reward (XP)
                <input
                  type="number"
                  className="mt-2 w-full rounded-full border border-transparent bg-[#F4F7FE] px-4 py-2 text-[#2B3674] focus:border-[#4318FF] focus:outline-none"
                  value={rewardDraft}
                  min={100}
                  onChange={(event) => setRewardDraft(Number(event.target.value))}
                />
              </label>
              <label className="block text-sm font-medium text-[#2B3674]">
                Difficulty
                <select
                  className="mt-2 w-full rounded-full border border-transparent bg-[#F4F7FE] px-4 py-2 text-[#2B3674] focus:border-[#4318FF] focus:outline-none"
                  value={difficultyDraft}
                  onChange={(event) => setDifficultyDraft(event.target.value as Quest["difficulty"])}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </label>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button className="rounded-full px-5 py-2 text-sm font-semibold text-[#A3AED0]" onClick={closeModal}>
                Cancel
              </button>
              <button
                className="rounded-full bg-[#4318FF] px-6 py-2 text-sm font-semibold text-white shadow-[0px_20px_45px_rgba(67,24,255,0.35)]"
                onClick={handleSave}
              >
                Save &amp; Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
