import p5 from 'p5';
import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyFontManager } from '../FontManager';
/**
 * Handles the final rendering of the ASCII output based on the final textures from the rendering pipeline.
 *
 * @remarks
 * This class is managed by the {@link P5AsciifyRendererManager} class to render the final ASCII output.
 */
export declare class P5AsciifyDisplayRenderer {
    private _p;
    private _grid;
    private _fontManager;
    /** The asciified texture */
    private _resultFramebuffer;
    /** Final shader to render the ASCII output. */
    private _shader;
    /**
     * Creates a new `P5AsciifyDisplayRenderer` instance.
     * @param _p The p5 instance.
     * @param _grid The grid instance.
     * @param _fontManager The font texture atlas instance.
     * @ignore
     */
    constructor(_p: p5, _grid: P5AsciifyGrid, _fontManager: P5AsciifyFontManager);
    /**
     * Renders the ASCII output to the result framebuffer.
     * @param characterFramebuffer The framebuffer containing the character indices.
     * @param primaryColorFramebuffer The framebuffer containing the primary color values.
     * @param secondaryColorFramebuffer The framebuffer containing the secondary color values.
     * @param transformFramebuffer The framebuffer containing the inversion values.
     * @param rotationFramebuffer The framebuffer containing the rotation values.
     * @ignore
     */
    render(characterFramebuffer: p5.Framebuffer, primaryColorFramebuffer: p5.Framebuffer, secondaryColorFramebuffer: p5.Framebuffer, transformFramebuffer: p5.Framebuffer, rotationFramebuffer: p5.Framebuffer): void;
    /**
     * Resizes the framebuffer to match the grid width/height.
     * @ignore
     */
    resizeFramebuffers(): void;
    /**
     * Returns the framebuffer containing the final ASCII output.
     * @ignore
     */
    get resultFramebuffer(): p5.Framebuffer;
}
