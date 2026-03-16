import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Props = {
  onAdd: (title: string, content: string) => void
}

export default function AddNoteDialog({ onAdd }: Props) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  function handleSubmit() {
    onAdd(title, content)
    setTitle("")
    setContent("")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Note</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Note</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Button onClick={handleSubmit}>Save</Button>
      </DialogContent>
    </Dialog>
  )
}