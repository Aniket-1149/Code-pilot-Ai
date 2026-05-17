import { LeftSidebar } from "@/components/ide/LeftSidebar";
import { EditorWorkspace } from "@/components/ide/EditorWorkspace";
import { RightCopilot } from "@/components/ide/RightCopilot";
import { BottomDock } from "@/components/ide/BottomDock";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const IDE = () => {
  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col overflow-hidden">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={72}>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={20} minSize={14} maxSize={30}>
              <LeftSidebar />
            </ResizablePanel>
            <ResizableHandle className="bg-primary/10 hover:bg-primary/40 w-px" />
            <ResizablePanel defaultSize={56} minSize={30}>
              <EditorWorkspace />
            </ResizablePanel>
            <ResizableHandle className="bg-primary/10 hover:bg-primary/40 w-px" />
            <ResizablePanel defaultSize={24} minSize={18} maxSize={40}>
              <RightCopilot />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle className="bg-primary/10 hover:bg-primary/40 h-px" />
        <ResizablePanel defaultSize={28} minSize={6} maxSize={60}>
          <BottomDock />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default IDE;
