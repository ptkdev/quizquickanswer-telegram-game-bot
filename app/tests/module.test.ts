/**
 * Jest Tests
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
test("show hello world", async () => {
	const app = () => "hello-world";
	expect(app()).toBe("hello-world");
});
