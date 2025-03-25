import "@mantine/core/styles.css";
import "./styles.css";
import { useState, useCallback, useMemo } from "react";
import {
  MantineProvider,
  Button,
  Container,
  Group,
  Text,
  Textarea,
  Title,
  Tooltip,
  Flex,
  Stack,
  CopyButton,
} from "@mantine/core";
import { theme } from "./theme";

export default function App() {
  const [text, setText] = useState("Welcome to Discord Colored Text Generator!");
  const [formattedText, setFormattedText] = useState(text);
  const [history, setHistory] = useState<string[]>([text]);

  // Convert HTML to Discord markdown
  const convertToDiscordMarkdown = useCallback((htmlText: string) => {
    let markdownText = htmlText.replace(
      /<span class='ansi-(\d+)'>(.*?)<\/span>/g,
      (match, code, content) => {
        switch (parseInt(code)) {
          // Foreground colors
          case 30:
            return `\`\`ansi\n\u001b[30m${content}\u001b[0m\`\``;
          case 31:
            return `\`\`ansi\n\u001b[31m${content}\u001b[0m\`\``;
          case 32:
            return `\`\`ansi\n\u001b[32m${content}\u001b[0m\`\``;
          case 33:
            return `\`\`ansi\n\u001b[33m${content}\u001b[0m\`\``;
          case 34:
            return `\`\`ansi\n\u001b[34m${content}\u001b[0m\`\``;
          case 35:
            return `\`\`ansi\n\u001b[35m${content}\u001b[0m\`\``;
          case 36:
            return `\`\`ansi\n\u001b[36m${content}\u001b[0m\`\``;
          case 37:
            return `\`\`ansi\n\u001b[37m${content}\u001b[0m\`\``;

          // Background colors
          case 40:
            return `\`\`ansi\n\u001b[40m${content}\u001b[0m\`\``;
          case 41:
            return `\`\`ansi\n\u001b[41m${content}\u001b[0m\`\``;
          case 42:
            return `\`\`ansi\n\u001b[42m${content}\u001b[0m\`\``;
          case 43:
            return `\`\`ansi\n\u001b[43m${content}\u001b[0m\`\``;
          case 44:
            return `\`\`ansi\n\u001b[44m${content}\u001b[0m\`\``;
          case 47:
            return `\`\`ansi\n\u001b[47m${content}\u001b[0m\`\``;

          // Formatting
          case 1:
            return `**${content}**`; // Bold
          case 4:
            return `__${content}__`; // Underline
          case 0:
            return content; // Reset

          default:
            return content;
        }
      }
    );

    return markdownText || htmlText;
  }, []);

  // Apply ANSI color or formatting styling
  const applyAnsiStyle = useCallback((ansiCode: number) => {
    const selection = window.getSelection()?.toString();
    if (!selection) return;

    const newText = formattedText.replace(
      selection,
      `<span class='ansi-${ansiCode}'>${selection}</span>`
    );
    
    // Update text and add to history
    setFormattedText(newText);
    setHistory(prev => [...prev, newText]);
  }, [formattedText]);

  // Compute Discord markdown
  const discordMarkdown = useMemo(() => {
    return convertToDiscordMarkdown(formattedText);
  }, [formattedText, convertToDiscordMarkdown]);

  // Copy formatted text to clipboard
  const handleCopy = () => {
    // Remove HTML tags for plain text copying
    const plainText = formattedText.replace(/<[^>]*>/g, '');
    navigator.clipboard.writeText(plainText);
    alert("Copied to clipboard!");
  };

  // Reset formatting
  const handleReset = () => {
    setText(text);
    setFormattedText(text);
    setHistory([text]);
  };

  // Undo last action
  const handleUndo = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // Remove current state
      setFormattedText(newHistory[newHistory.length - 1]);
      setHistory(newHistory);
    }
  };

  return (
    <MantineProvider theme={theme}>
      <Container>
        <Title ta="center" mb="md">
          Discord <span style={{ color: "#5865F2" }}>Colored</span> Text Generator
        </Title>

        <Stack gap="md">
          {/* Textarea for input */}
          <Textarea
            value={text}
            onChange={(event) => {
              const newText = event.target.value;
              setText(newText);
              setFormattedText(newText);
              setHistory([newText]);
            }}
            placeholder="Enter text here"
            autosize
            minRows={2}
            maxRows={5}
          />

          <Text size="sm" c="dimmed">
            Tip: Select text and click color/style buttons to apply
          </Text>

          {/* Formatting Buttons */}
          <Flex direction={{ base: 'column', sm: 'row' }} gap="md">
            <Stack flex={1}>
              <Text fw={500}>Text Colors:</Text>
              <Group>
                <Tooltip label="Black Foreground">
                  <Button 
                    className="color-button" 
                    variant="light" 
                    onClick={() => applyAnsiStyle(30)}
                  >
                    Black
                  </Button>
                </Tooltip>
                <Tooltip label="Red Foreground">
                  <Button 
                    className="color-button" 
                    color="red" 
                    variant="light" 
                    onClick={() => applyAnsiStyle(31)}
                  >
                    Red
                  </Button>
                </Tooltip>
                <Tooltip label="Green Foreground">
                  <Button 
                    className="color-button" 
                    color="green" 
                    variant="light" 
                    onClick={() => applyAnsiStyle(32)}
                  >
                    Green
                  </Button>
                </Tooltip>
                <Tooltip label="Yellow Foreground">
                  <Button 
                    className="color-button" 
                    color="yellow" 
                    variant="light" 
                    onClick={() => applyAnsiStyle(33)}
                  >
                    Yellow
                  </Button>
                </Tooltip>

                <Tooltip label="Blue Foreground">
                  <Button 
                    className="color-button" 
                    color="blue" 
                    variant="light" 
                    onClick={() => applyAnsiStyle(34)}
                  >
                    Blue
                  </Button>
                </Tooltip>
                <Tooltip label="Magenta Foreground">
                  <Button 
                    className="color-button" 
                    color="magenta" 
                    variant="light" 
                    onClick={() => applyAnsiStyle(35)}
                  >
                    Magenta
                  </Button>
                </Tooltip>

                <Tooltip label="Cyan Foreground">
                  <Button 
                    className="color-button" 
                    color="cyan" 
                    variant="light" 
                    onClick={() => applyAnsiStyle(36)}
                  >
                    Cyan
                  </Button>
                </Tooltip>
                <Tooltip label="White Foreground">
                  <Button 
                    className="color-button" 
                    color="blue" 
                    variant="white" 
                    onClick={() => applyAnsiStyle(37)}
                  >
                    White
                  </Button>
                </Tooltip>
              </Group>
            </Stack>

            <Stack flex={1}>
              <Text fw={500}>Background Colors:</Text>
              <Group>
                <Tooltip label="Black Background">
                  <Button 
                    className="color-button" 
                    variant="outline" 
                    onClick={() => applyAnsiStyle(40)}
                  >
                    Black
                  </Button>
                </Tooltip>

                <Tooltip label="Red Background">
                  <Button 
                    className="color-button" 
                    color="red" 
                    variant="outline" 
                    onClick={() => applyAnsiStyle(41)}
                  >
                    Red
                  </Button>
                </Tooltip>

                <Tooltip label="Green Background">
                  <Button 
                    className="color-button" 
                    color="green" 
                    variant="outline" 
                    onClick={() => applyAnsiStyle(42)}
                  >
                    Green
                  </Button>
                </Tooltip>

                <Tooltip label="Yellow Background">
                  <Button 
                    className="color-button" 
                    color="yellow" 
                    variant="outline" 
                    onClick={() => applyAnsiStyle(43)}
                  >
                    Yellow
                  </Button>
                </Tooltip>

                <Tooltip label="Blue Background">
                  <Button 
                    className="color-button" 
                    color="blue" 
                    variant="outline" 
                    onClick={() => applyAnsiStyle(44)}
                  >
                    Blue
                  </Button>
                </Tooltip>

                <Tooltip label="White Background">
                  <Button 
                    className="color-button" 
                    color="black" 
                    variant="outline" 
                    onClick={() => applyAnsiStyle(47)}
                  >
                    White 
                  </Button>
                </Tooltip>
              </Group>
            </Stack>
          </Flex>

          {/* Additional Formatting */}
          <Stack>
            <Text fw={500}>Text Formatting:</Text>
            <Group>
              <Tooltip label="Bold Text">
                <Button 
                  className="color-button" 
                  variant="light" 
                  onClick={() => applyAnsiStyle(1)}
                >
                  Bold
                </Button>
              </Tooltip>
              <Tooltip label="Underline Text">
                <Button 
                  className="color-button" 
                  variant="light" 
                  onClick={() => applyAnsiStyle(4)}
                >
                  Underline
                </Button>
              </Tooltip>
              <Tooltip label="Reset Formatting">
                <Button 
                  className="color-button" 
                  variant="light" 
                  color="red"
                  onClick={() => applyAnsiStyle(0)}
                >
                  Reset
                </Button>
              </Tooltip>
            </Group>
          </Stack>

          {/* Preview and Actions */}
          <Stack>
            <Text size="lg" fw={500}>
              Preview:
            </Text>
            <div
              style={{
                backgroundColor: "#2F3136",
                color: "#B9BBBE",
                padding: "10px",
                borderRadius: "5px",
                minHeight: "50px",
                whiteSpace: "pre-wrap",
              }}
              dangerouslySetInnerHTML={{ __html: formattedText }}
            />

            {/* Discord Markdown Preview */}
            <Text size="lg" fw={500}>
              Discord Markdown:
            </Text>
            <Textarea
              value={discordMarkdown}
              readOnly
              autosize
              minRows={2}
              rightSection={
                <CopyButton value={discordMarkdown}>
                  {({ copied, copy }) => (
                    <Tooltip
                      label={copied ? "Copied" : "Copy"}
                      position="right"
                    >
                      <Button
                        size="xs"
                        variant={copied ? "filled" : "outline"}
                        onClick={copy}
                      >
                        {copied ? "Copied" : "Copy"}
                      </Button>
                    </Tooltip>
                  )}
                </CopyButton>
              }
            />

            {/* Action Buttons */}
            <Group justify="space-between">
              <Group>
                <Button variant="outline" onClick={handleCopy}>
                  Copy Plain Text
                </Button>
                <Button 
                  variant="outline" 
                  color="gray" 
                  onClick={handleReset}
                >
                  Reset All
                </Button>
                <Button 
                  variant="outline" 
                  color="gray" 
                  onClick={handleUndo}
                  disabled={history.length <= 1}
                >
                  Undo
                </Button>
              </Group>
            </Group>
          </Stack>

          {/* Disclaimer */}
          <Tooltip 
            label="This tool is unofficial and not endorsed by Discord." 
            position="bottom"
          >
            <Text size="sm" c="dimmed" ta="center">
              Unofficial Discord Text Styling Tool
            </Text>
          </Tooltip>
        </Stack>
      </Container>
    </MantineProvider>
  );
}