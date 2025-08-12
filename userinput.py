     # userinput.py
import tkinter as tk
from tkinter import messagebox, filedialog
import customtkinter as ctk
import os
from datetime import datetime

try:
    from PIL import Image, ImageTk
    from PIL import ImageGrab
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False

try:
    from tkinterdnd2 import DND_FILES, TkinterDnD
    DND_AVAILABLE = True
except ImportError:
    DND_AVAILABLE = False


class PromptInput:
    def __init__(self):
        # Set customtkinter appearance mode and color theme
        ctk.set_appearance_mode("system")  # Modes: "system" (default), "dark", "light"
        ctk.set_default_color_theme("blue")  # Themes: "blue" (default), "green", "dark-blue"
        
        # Initialize customtkinter window
        if DND_AVAILABLE:
            # Use TkinterDnD for drag and drop support
            self.root = TkinterDnD.Tk()
            # Apply customtkinter styling
            ctk.set_widget_scaling(1.0)
        else:
            # Use customtkinter window
            self.root = ctk.CTk()
            
        self.root.title("✨ AI Assistant Prompt Input")
        self.root.geometry("1000x750")
        self.root.minsize(900, 650)
        self.root.resizable(False, False)

        self.attached_files = []
        self.file_previews = []
        self.setup_ui()
        self.bind_events()

    def setup_ui(self):
        # Main container with transparent background to remove white padding
        main_container = ctk.CTkFrame(self.root, fg_color="transparent")
        main_container.pack(fill="both", expand=True, padx=20, pady=20)

        # Header section
        header_frame = ctk.CTkFrame(main_container, fg_color="transparent")
        header_frame.pack(fill="x", pady=(0, 20))

        title_label = ctk.CTkLabel(header_frame,
                                  text="✨ AI Assistant Prompt Input",
                                  font=ctk.CTkFont(size=24, weight="bold"))
        title_label.pack()

        subtitle_label = ctk.CTkLabel(header_frame,
                                     text="Enter your prompt and attach images for AI assistance",
                                     font=ctk.CTkFont(size=12),
                                     text_color=("gray60", "gray40"))
        subtitle_label.pack(pady=(5, 0))
        
        # Theme toggle button
        theme_frame = ctk.CTkFrame(header_frame, fg_color="transparent")
        theme_frame.pack(pady=(10, 0))
        
        self.theme_button = ctk.CTkButton(theme_frame,
                                         text="🌙 Dark Mode",
                                         command=self.toggle_theme,
                                         width=120,
                                         height=30)
        self.theme_button.pack(side="left", padx=5)
        
        system_button = ctk.CTkButton(theme_frame,
                                     text="🖥️ System",
                                     command=lambda: self.set_theme("system"),
                                     width=120,
                                     height=30)
        system_button.pack(side="left", padx=5)

        # Content frame with modern styling and proper padding
        content_frame = ctk.CTkFrame(main_container)
        content_frame.pack(fill="both", expand=True, pady=(0, 15))

        # Prompt input section with padding
        prompt_label = ctk.CTkLabel(content_frame,
                                   text="📝 Your Prompt:",
                                   font=ctk.CTkFont(size=14, weight="bold"))
        prompt_label.pack(anchor="w", padx=20, pady=(20, 10))

        # Use CTkTextbox for better integration with customtkinter
        self.prompt_input = ctk.CTkTextbox(content_frame,
                                          height=150,
                                          wrap="word",
                                          font=ctk.CTkFont(size=12),
                                          corner_radius=10)
        self.prompt_input.pack(fill="x", padx=20, pady=(0, 15))

        # File section with padding
        file_section_label = ctk.CTkLabel(content_frame,
                                          text="📁 Attached Files:",
                                          font=ctk.CTkFont(size=14, weight="bold"))
        file_section_label.pack(anchor="w", padx=20, pady=(10, 10))

        self.file_preview_frame = ctk.CTkScrollableFrame(content_frame, height=80)
        self.file_preview_frame.pack(fill="x", padx=20, pady=(0, 15))

        # Enable drag and drop if available - use the underlying tkinter widget
        if DND_AVAILABLE:
            # Get the underlying tkinter widget for drag and drop compatibility
            underlying_widget = self.file_preview_frame._parent_canvas
            underlying_widget.drop_target_register(DND_FILES)
            underlying_widget.dnd_bind('<<Drop>>', self.handle_drop)
            
            # Also register on the scrollable frame itself
            try:
                self.file_preview_frame.drop_target_register(DND_FILES)
                self.file_preview_frame.dnd_bind('<<Drop>>', self.handle_drop)
            except:
                pass

        self.no_files_label = ctk.CTkLabel(self.file_preview_frame,
                                          text="No files attached yet. Drag & drop files here or use buttons below.",
                                          font=ctk.CTkFont(size=11),
                                          text_color=("gray60", "gray40"))
        self.no_files_label.pack()

        button_frame = ctk.CTkFrame(content_frame, fg_color="transparent")
        button_frame.pack(fill="x", padx=20, pady=(10, 20))

        left_buttons = ctk.CTkFrame(button_frame, fg_color="transparent")
        left_buttons.pack(side="left", anchor="w")

        attach_btn = ctk.CTkButton(left_buttons,
                                  text="📎 Browse Files",
                                  command=self.attach_file,
                                  width=160,
                                  height=45,
                                  corner_radius=8,
                                  font=ctk.CTkFont(size=12, weight="bold"))
        attach_btn.pack(side="left", padx=(0, 10))

        if PIL_AVAILABLE:
            paste_btn = ctk.CTkButton(left_buttons,
                                     text="📋 Paste Screenshot",
                                     command=self.paste_image,
                                     width=180,
                                     height=45,
                                     corner_radius=8,
                                     font=ctk.CTkFont(size=12, weight="bold"),
                                     fg_color=("#3b82f6", "#1e40af"))
            paste_btn.pack(side="left", padx=(0, 10))

        clear_btn = ctk.CTkButton(left_buttons,
                                 text="🗑️ Clear All",
                                 command=self.clear_all_files,
                                 width=140,
                                 height=45,
                                 corner_radius=8,
                                 font=ctk.CTkFont(size=12, weight="bold"),
                                 fg_color=("#ef4444", "#dc2626"),
                                 hover_color=("#dc2626", "#b91c1c"))
        clear_btn.pack(side="left")

        # Right side container for submit button
        right_buttons = ctk.CTkFrame(button_frame, fg_color="transparent")
        right_buttons.pack(side="right", anchor="e")
        
        submit_btn = ctk.CTkButton(right_buttons,
                                  text="🚀 Submit",
                                  command=self.submit,
                                  width=160,
                                  height=50,
                                  corner_radius=8,
                                  font=ctk.CTkFont(size=16, weight="bold"),
                                  fg_color=("#10b981", "#059669"),
                                  hover_color=("#059669", "#047857"))
        submit_btn.pack()

        if PIL_AVAILABLE:
            instructions_frame = ctk.CTkFrame(main_container, fg_color="transparent")
            instructions_frame.pack(fill="x", pady=(10, 0))

            instructions = ctk.CTkLabel(instructions_frame,
                                       text="💡 Tip: Copy an image to clipboard and press Ctrl+V to paste it quickly",
                                       font=ctk.CTkFont(size=11),
                                       text_color=("gray60", "gray40"))
            instructions.pack()

    def toggle_theme(self):
        current_mode = ctk.get_appearance_mode()
        if current_mode == "Light":
            ctk.set_appearance_mode("dark")
            self.theme_button.configure(text="☀️ Light Mode")
        else:
            ctk.set_appearance_mode("light")
            self.theme_button.configure(text="🌙 Dark Mode")
    
    def set_theme(self, mode):
        ctk.set_appearance_mode(mode)
        if mode == "dark":
            self.theme_button.configure(text="☀️ Light Mode")
        elif mode == "light":
            self.theme_button.configure(text="🌙 Dark Mode")
        else:  # system
            self.theme_button.configure(text="🖥️ System")

    def select_all_text(self, event=None):
        # CTkTextbox uses different methods
        self.prompt_input.focus()
        self.prompt_input.tag_add("sel", "1.0", "end")
        return 'break'

    def bind_events(self):
        self.prompt_input.bind('<Control-a>', self.select_all_text)
        self.prompt_input.bind('<Control-c>', lambda e: self.prompt_input.event_generate('<<Copy>>'))
        self.prompt_input.bind('<Control-x>', lambda e: self.prompt_input.event_generate('<<Cut>>'))
        
        # Enable normal text pasting
        self.prompt_input.bind('<Control-v>', self.handle_text_paste)
        
        # Enable image pasting with different key combination
        if PIL_AVAILABLE:
            self.root.bind('<Control-Shift-v>', self.handle_paste)
            self.prompt_input.bind('<Control-Shift-v>', self.handle_paste)

    def handle_text_paste(self, event=None):
        """Handle normal text pasting with Ctrl+V"""
        try:
            # Get text from clipboard
            clipboard_text = self.root.clipboard_get()
            if clipboard_text:
                # Insert text at current cursor position
                current_pos = self.prompt_input.index(tk.INSERT)
                self.prompt_input.insert(current_pos, clipboard_text)
                return "break"  # Prevent default paste behavior
        except tk.TclError:
            # No text in clipboard, allow default behavior
            pass
        return None

    def handle_paste(self, event=None):
        if hasattr(self, '_pasting') and self._pasting:
            return "break"

        self._pasting = True
        self.root.after(100, lambda: setattr(self, '_pasting', False))

        if event and event.widget == self.prompt_input:
            try:
                clipboard_text = self.root.clipboard_get()
                if clipboard_text and clipboard_text.strip():
                    return
            except tk.TclError:
                pass

            try:
                if self.prompt_input.selection_get():
                    return
            except tk.TclError:
                pass

        self.paste_image()
        return "break"

    def clear_old_screenshots(self):
        """Delete old screenshot files from the screenshot folder"""
        try:
            screenshot_folder = os.path.join(os.getcwd(), "screenshot")
            if os.path.exists(screenshot_folder):
                for filename in os.listdir(screenshot_folder):
                    if filename.startswith("pasted_image_") and filename.endswith(".png"):
                        filepath = os.path.join(screenshot_folder, filename)
                        try:
                            os.remove(filepath)
                        except:
                            pass  # Ignore errors when deleting
        except:
            pass  # Ignore errors

    def paste_image(self):
        if not PIL_AVAILABLE:
            messagebox.showwarning("PIL Not Available", "Please install Pillow: pip install Pillow")
            return

        try:
            image = ImageGrab.grabclipboard()
            if image is None:
                if not hasattr(self, '_auto_paste'):
                    messagebox.showinfo("No Image", "No image found in clipboard")
                return

            # Clear old screenshots before adding new one
            self.clear_old_screenshots()

            # ✅ Create 'screenshot' folder if not exists
            screenshot_folder = os.path.join(os.getcwd(), "screenshot")
            os.makedirs(screenshot_folder, exist_ok=True)

            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S_%f")
            filename = f"pasted_image_{timestamp}.png"
            filepath = os.path.join(screenshot_folder, filename)

            image.save(filepath)
            self.add_file_to_ui(filepath, filename)

            if not hasattr(self, '_auto_paste'):
                messagebox.showinfo("Success", f"Screenshot saved to screenshot folder as {filename}")

        except Exception as e:
            messagebox.showerror("Error", f"Failed to paste image: {str(e)}")

    def handle_drop(self, event):
        """Handle drag and drop files"""
        files = self.root.tk.splitlist(event.data)
        for filepath in files:
            if os.path.isfile(filepath):
                filename = os.path.basename(filepath)
                self.add_file_to_ui(filepath, filename)

    def attach_file(self):
        filetypes = [
            ("All files", "*.*"),
            ("Image files", "*.png *.jpg *.jpeg *.gif *.bmp *.tiff"),
            ("Document files", "*.pdf *.doc *.docx *.txt *.rtf"),
            ("Spreadsheet files", "*.xls *.xlsx *.csv"),
            ("Archive files", "*.zip *.rar *.7z")
        ]

        filepaths = filedialog.askopenfilenames(
            title="Select files",
            filetypes=filetypes
        )

        for filepath in filepaths:
            filename = os.path.basename(filepath)
            self.add_file_to_ui(filepath, filename)

    def clear_all_files(self):
        """Clear all attached files"""
        self.attached_files.clear()
        self.file_previews.clear()
        
        # Clear the preview frame
        for widget in self.file_preview_frame.winfo_children():
            widget.destroy()
            
        # Show the no files label
        self.no_files_label = ctk.CTkLabel(self.file_preview_frame,
                                          text="No files attached yet. Drag & drop files here or use buttons below.",
                                          font=ctk.CTkFont(size=11),
                                          text_color=("gray60", "gray40"))
        self.no_files_label.pack(pady=20)
        
        # Clear old screenshots
        self.clear_old_screenshots()

    def get_file_icon(self, filepath):
        """Get appropriate icon for file type"""
        ext = os.path.splitext(filepath)[1].lower()
        if ext in ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.webp']:
            return "🖼️"
        elif ext in ['.pdf']:
            return "📄"
        elif ext in ['.doc', '.docx']:
            return "📝"
        elif ext in ['.xls', '.xlsx', '.csv']:
            return "📊"
        elif ext in ['.zip', '.rar', '.7z']:
            return "📦"
        elif ext in ['.txt', '.rtf']:
            return "📃"
        elif ext in ['.mp4', '.avi', '.mov', '.wmv']:
            return "🎥"
        elif ext in ['.mp3', '.wav', '.flac']:
            return "🎵"
        else:
            return "📁"

    def add_file_to_ui(self, filepath, filename):
        # Check if file already exists
        if filepath in self.attached_files:
            messagebox.showinfo("Duplicate File", f"File '{filename}' is already attached.")
            return
            
        self.attached_files.append(filepath)

        if hasattr(self, 'no_files_label') and self.no_files_label.winfo_exists():
            self.no_files_label.destroy()

        item_frame = ctk.CTkFrame(self.file_preview_frame)
        item_frame.pack(fill="x", pady=5, padx=10)

        preview_frame = ctk.CTkFrame(item_frame, fg_color="transparent")
        preview_frame.pack(side="left", padx=10, pady=10)

        # Try to show image preview for image files, otherwise show icon
        try:
            ext = os.path.splitext(filepath)[1].lower()
            if PIL_AVAILABLE and ext in ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.webp']:
                img = Image.open(filepath)
                img.thumbnail((80, 80), Image.Resampling.LANCZOS)
                photo = ImageTk.PhotoImage(img)

                preview_label = ctk.CTkLabel(preview_frame, image=photo, text="")
                preview_label.image = photo
                preview_label.pack()

                self.file_previews.append(photo)
            else:
                icon = self.get_file_icon(filepath)
                preview_label = ctk.CTkLabel(preview_frame, text=icon, font=ctk.CTkFont(size=24))
                preview_label.pack()
        except:
            icon = self.get_file_icon(filepath)
            preview_label = ctk.CTkLabel(preview_frame, text=icon, font=ctk.CTkFont(size=24))
            preview_label.pack()

        info_frame = ctk.CTkFrame(item_frame, fg_color="transparent")
        info_frame.pack(side="left", fill="x", expand=True, padx=10, pady=10)

        name_label = ctk.CTkLabel(info_frame, text=filename,
                                 font=ctk.CTkFont(size=12, weight="bold"),
                                 anchor="w")
        name_label.pack(fill="x", anchor="w")

        try:
            size = os.path.getsize(filepath)
            size_text = f"{size / 1024:.1f} KB" if size < 1024 * 1024 else f"{size / (1024 * 1024):.1f} MB"
            size_label = ctk.CTkLabel(info_frame, text=size_text,
                                     font=ctk.CTkFont(size=10),
                                     text_color=("gray60", "gray40"),
                                     anchor="w")
            size_label.pack(fill="x", anchor="w")
        except:
            pass

        remove_btn = ctk.CTkButton(item_frame, text="🗑️",
                                  command=lambda: self.remove_file(filepath, item_frame),
                                  width=40,
                                  height=40,
                                  corner_radius=8,
                                  fg_color=("#ef4444", "#dc2626"),
                                  hover_color=("#dc2626", "#b91c1c"))
        remove_btn.pack(side="right", padx=10, pady=10)

    def remove_file(self, filepath, frame):
        if filepath in self.attached_files:
            self.attached_files.remove(filepath)
        frame.destroy()

        if not self.attached_files:
            self.no_files_label = ctk.CTkLabel(self.file_preview_frame,
                                              text="No files attached yet. Drag & drop files here or use buttons below.",
                                              font=ctk.CTkFont(size=11),
                                              text_color=("gray60", "gray40"))
            self.no_files_label.pack(pady=20)

    def submit(self):
        prompt_text = self.prompt_input.get("1.0", "end").strip()
        if not prompt_text and not self.attached_files:
            messagebox.showwarning("Missing Input", "Please enter a prompt or attach a file.")
            return

        if prompt_text:
            print(prompt_text)

        if self.attached_files:
            print("\n--- ATTACHED FILES ---")
            for file_path in self.attached_files:
                if os.path.exists(file_path):
                    print(f"File: {file_path}")
                    try:
                        size = os.path.getsize(file_path)
                        size_text = f"{size / 1024:.1f} KB" if size < 1024 * 1024 else f"{size / (1024 * 1024):.1f} MB"
                        print(f"Size: {size_text} ({size} bytes)")
                        print(f"Type: {os.path.splitext(file_path)[1].upper() or 'No extension'}")
                    except:
                        print("Size: Unknown")
                else:
                    print(f"File (NOT FOUND): {file_path}")

        self.root.destroy()

    def run(self):
        self.root.mainloop()


if __name__ == "__main__":
    app = PromptInput()
    app.run()